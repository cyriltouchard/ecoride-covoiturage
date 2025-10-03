// server/models/rideSQLModel.js
// Modèle Covoiturages MySQL pour ECF US9

const { pool } = require('../config/db-mysql');

class RideSQL {
    
    // Créer un nouveau covoiturage (US9)
    static async create(rideData) {
        const {
            driver_id,
            vehicle_id,
            departure_city,
            arrival_city,
            departure_address,
            arrival_address,
            departure_datetime,
            estimated_arrival,
            price_per_seat,
            available_seats
        } = rideData;
        
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();
            
            // Vérifier que l'utilisateur est chauffeur
            const [driverCheck] = await connection.execute(
                'SELECT user_type FROM users WHERE id = ? AND user_type IN ("chauffeur", "chauffeur_passager")',
                [driver_id]
            );
            
            if (!driverCheck[0]) {
                throw new Error('Seuls les chauffeurs peuvent créer des trajets');
            }
            
            // Vérifier que le véhicule appartient au chauffeur
            const [vehicleCheck] = await connection.execute(
                'SELECT id, available_seats, energy_type FROM vehicles WHERE id = ? AND user_id = ? AND is_active = TRUE',
                [vehicle_id, driver_id]
            );
            
            if (!vehicleCheck[0]) {
                throw new Error('Véhicule non trouvé ou non autorisé');
            }
            
            const vehicle = vehicleCheck[0];
            const total_seats = Math.min(available_seats, vehicle.available_seats);
            
            // Vérifier les crédits du chauffeur (commission plateforme)
            const [creditsCheck] = await connection.execute(
                'SELECT current_credits FROM user_credits WHERE user_id = ?',
                [driver_id]
            );
            
            if (!creditsCheck[0] || creditsCheck[0].current_credits < 2) {
                throw new Error('Crédits insuffisants (2 crédits requis pour la commission plateforme)');
            }
            
            // Créer le trajet
            const [result] = await connection.execute(
                `INSERT INTO rides 
                 (driver_id, vehicle_id, departure_city, arrival_city, departure_address, arrival_address,
                  departure_datetime, estimated_arrival, price_per_seat, platform_commission, 
                  available_seats, total_seats, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 2.00, ?, ?, 'en_attente')`,
                [
                    driver_id, vehicle_id, departure_city, arrival_city, departure_address, arrival_address,
                    departure_datetime, estimated_arrival, price_per_seat, total_seats, total_seats
                ]
            );
            
            const rideId = result.insertId;
            
            await connection.commit();
            
            // Récupérer le trajet créé avec détails
            return await this.getById(rideId);
            
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
    
    // Obtenir un trajet par ID avec tous les détails
    static async getById(rideId) {
        const [rows] = await pool.execute(
            `SELECT 
                r.*,
                u.pseudo as driver_pseudo,
                v.brand, v.model, v.color, v.energy_type,
                CASE WHEN v.energy_type = 'electrique' THEN true ELSE false END as is_ecological,
                uc.current_credits as driver_credits
             FROM rides r
             JOIN users u ON r.driver_id = u.id
             JOIN vehicles v ON r.vehicle_id = v.id
             LEFT JOIN user_credits uc ON u.id = uc.user_id
             WHERE r.id = ?`,
            [rideId]
        );
        
        return rows[0] || null;
    }
    
    // Obtenir tous les trajets d'un chauffeur
    static async getDriverRides(driverId, status = null) {
        let query = `
            SELECT 
                r.*,
                v.brand, v.model, v.energy_type,
                CASE WHEN v.energy_type = 'electrique' THEN true ELSE false END as is_ecological,
                COUNT(b.id) as bookings_count
            FROM rides r
            JOIN vehicles v ON r.vehicle_id = v.id
            LEFT JOIN bookings b ON r.id = b.ride_id AND b.booking_status != 'annule'
            WHERE r.driver_id = ?
        `;
        
        const params = [driverId];
        
        if (status) {
            query += ' AND r.status = ?';
            params.push(status);
        }
        
        query += ' GROUP BY r.id ORDER BY r.departure_datetime DESC';
        
        const [rows] = await pool.execute(query, params);
        return rows;
    }
    
    // Rechercher des covoiturages (US3)
    static async search(searchParams) {
        const {
            departure_city,
            arrival_city,
            departure_date,
            max_price = null,
            ecological_only = false,
            min_seats = 1
        } = searchParams;
        
        let query = `
            SELECT 
                r.id, r.departure_city, r.arrival_city, r.departure_datetime, r.estimated_arrival,
                r.price_per_seat, r.available_seats, r.total_seats,
                u.pseudo as driver_pseudo,
                v.brand, v.model, v.energy_type,
                CASE WHEN v.energy_type = 'electrique' THEN true ELSE false END as is_ecological
            FROM rides r
            JOIN users u ON r.driver_id = u.id
            JOIN vehicles v ON r.vehicle_id = v.id
            WHERE r.status = 'en_attente'
            AND r.available_seats >= ?
            AND r.departure_datetime > NOW()
        `;
        
        const params = [min_seats];
        
        if (departure_city) {
            query += ' AND r.departure_city LIKE ?';
            params.push(`%${departure_city}%`);
        }
        
        if (arrival_city) {
            query += ' AND r.arrival_city LIKE ?';
            params.push(`%${arrival_city}%`);
        }
        
        if (departure_date) {
            query += ' AND DATE(r.departure_datetime) = ?';
            params.push(departure_date);
        }
        
        if (max_price) {
            query += ' AND r.price_per_seat <= ?';
            params.push(max_price);
        }
        
        if (ecological_only) {
            query += ' AND v.energy_type = "electrique"';
        }
        
        query += ' ORDER BY r.departure_datetime ASC';
        
        const [rows] = await pool.execute(query, params);
        return rows;
    }
    
    // Mettre à jour le statut d'un trajet (US11)
    static async updateStatus(rideId, driverId, newStatus) {
        const validStatuses = ['en_attente', 'confirme', 'en_cours', 'termine', 'annule'];
        
        if (!validStatuses.includes(newStatus)) {
            throw new Error('Statut invalide');
        }
        
        const [result] = await pool.execute(
            'UPDATE rides SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND driver_id = ?',
            [newStatus, rideId, driverId]
        );
        
        if (result.affectedRows === 0) {
            throw new Error('Trajet non trouvé ou non autorisé');
        }
        
        return await this.getById(rideId);
    }
    
    // Annuler un trajet (US10)
    static async cancel(rideId, driverId, reason = 'Annulé par le chauffeur') {
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();
            
            // Vérifier que le trajet existe et appartient au chauffeur
            const [rideCheck] = await connection.execute(
                'SELECT status, available_seats, total_seats FROM rides WHERE id = ? AND driver_id = ?',
                [rideId, driverId]
            );
            
            if (!rideCheck[0]) {
                throw new Error('Trajet non trouvé ou non autorisé');
            }
            
            const ride = rideCheck[0];
            
            if (ride.status === 'annule') {
                throw new Error('Trajet déjà annulé');
            }
            
            if (ride.status === 'termine') {
                throw new Error('Impossible d\'annuler un trajet terminé');
            }
            
            // Mettre à jour le statut du trajet
            await connection.execute(
                'UPDATE rides SET status = "annule", updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [rideId]
            );
            
            // Rembourser les passagers (s'il y en a)
            const bookedSeats = ride.total_seats - ride.available_seats;
            if (bookedSeats > 0) {
                // Cette logique sera implémentée avec le système de réservations
                console.log(`Remboursement nécessaire pour ${bookedSeats} places réservées`);
            }
            
            await connection.commit();
            
            return { success: true, message: 'Trajet annulé avec succès' };
            
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
    
    // Statistiques trajets pour admin
    static async getStatistics(dateStart = null, dateEnd = null) {
        let query = `
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as total_rides,
                COUNT(CASE WHEN status = 'termine' THEN 1 END) as completed_rides,
                COUNT(CASE WHEN status = 'annule' THEN 1 END) as cancelled_rides,
                SUM(price_per_seat * (total_seats - available_seats)) as revenue
            FROM rides
        `;
        
        const params = [];
        
        if (dateStart && dateEnd) {
            query += ' WHERE DATE(created_at) BETWEEN ? AND ?';
            params.push(dateStart, dateEnd);
        } else if (dateStart) {
            query += ' WHERE DATE(created_at) >= ?';
            params.push(dateStart);
        }
        
        query += ' GROUP BY DATE(created_at) ORDER BY date DESC';
        
        const [rows] = await pool.execute(query, params);
        return rows;
    }
    
    // Valider les données de trajet
    static validateRideData(data) {
        const errors = [];
        
        if (!data.departure_city || data.departure_city.trim().length < 2) {
            errors.push('Ville de départ requise (min 2 caractères)');
        }
        
        if (!data.arrival_city || data.arrival_city.trim().length < 2) {
            errors.push('Ville d\'arrivée requise (min 2 caractères)');
        }
        
        if (!data.departure_datetime) {
            errors.push('Date et heure de départ requises');
        } else {
            const depDate = new Date(data.departure_datetime);
            if (depDate <= new Date()) {
                errors.push('La date de départ doit être dans le futur');
            }
        }
        
        if (!data.price_per_seat || data.price_per_seat <= 0 || data.price_per_seat > 999.99) {
            errors.push('Prix par place invalide (0.01 à 999.99€)');
        }
        
        if (!data.available_seats || data.available_seats < 1 || data.available_seats > 8) {
            errors.push('Nombre de places invalide (1 à 8)');
        }
        
        return errors;
    }
    // Méthode pour mettre à jour le nombre de places disponibles
    static async updateAvailableSeats(rideId, newAvailableSeats) {
        try {
            const query = `
                UPDATE rides 
                SET available_seats = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `;
            
            const [result] = await pool.execute(query, [newAvailableSeats, rideId]);
            
            if (result.affectedRows === 0) {
                throw new Error('Trajet non trouvé pour la mise à jour des places');
            }
            
            return true;
        } catch (error) {
            console.error('Erreur mise à jour places disponibles:', error);
            throw error;
        }
    }

    // Méthode pour obtenir les trajets d'un chauffeur spécifique
    static async getByDriverId(driverId) {
        try {
            const query = `
                SELECT 
                    r.*,
                    v.brand,
                    v.model,
                    v.energy_type,
                    u.name as driver_name
                FROM rides r
                LEFT JOIN vehicles v ON r.vehicle_id = v.id
                LEFT JOIN users u ON r.driver_id = u.id
                WHERE r.driver_id = ?
                ORDER BY r.departure_date DESC, r.departure_time DESC
            `;
            
            const [rows] = await pool.execute(query, [driverId]);
            return rows;
        } catch (error) {
            console.error('Erreur récupération trajets chauffeur:', error);
            throw error;
        }
    }

    // Méthode pour obtenir les trajets d'un chauffeur avec filtre de statut
    static async getDriverRides(driverId, status = null) {
        try {
            let query = `
                SELECT 
                    r.*,
                    v.brand,
                    v.model,
                    v.energy_type,
                    v.seats as vehicle_seats
                FROM rides r
                LEFT JOIN vehicles v ON r.vehicle_id = v.id
                WHERE r.driver_id = ?
            `;
            
            const params = [driverId];
            
            if (status) {
                query += ' AND r.status = ?';
                params.push(status);
            }
            
            query += ' ORDER BY r.departure_date DESC, r.departure_time DESC';
            
            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Erreur récupération trajets chauffeur avec statut:', error);
            throw error;
        }
    }

}

module.exports = RideSQL;