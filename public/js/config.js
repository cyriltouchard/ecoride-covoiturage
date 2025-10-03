// Configuration centralisée pour EcoRide
window.EcoRideConfig = {
    // Configuration API
    API_BASE_URL: `${window.location.protocol}//${window.location.hostname}:3002/api`,
    
    // Configuration WebSocket (pour futures notifications temps réel)
    WS_URL: `ws://${window.location.hostname}:3002`,
    
    // Configuration application
    APP_NAME: 'EcoRide',
    VERSION: '2.0.0',
    
    // Configuration crédits
    INITIAL_CREDITS: 20,
    PLATFORM_COMMISSION: 2,
    
    // Configuration pagination
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    
    // Configuration uploads
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    
    // Messages d'erreur
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'Erreur de connexion au serveur',
        UNAUTHORIZED: 'Session expirée, veuillez vous reconnecter',
        FORBIDDEN: 'Accès non autorisé',
        NOT_FOUND: 'Ressource non trouvée',
        SERVER_ERROR: 'Erreur serveur interne',
        VALIDATION_ERROR: 'Données invalides'
    },
    
    // Messages de succès
    SUCCESS_MESSAGES: {
        LOGIN: 'Connexion réussie',
        LOGOUT: 'Déconnexion réussie',
        VEHICLE_ADDED: 'Véhicule ajouté avec succès',
        RIDE_CREATED: 'Covoiturage créé avec succès',
        BOOKING_CONFIRMED: 'Réservation confirmée',
        PROFILE_UPDATED: 'Profil mis à jour'
    },
    
    // Types d'énergie véhicules
    ENERGY_TYPES: {
        'electrique': { label: '🔋 Électrique', color: '#27ae60', eco: true },
        'hybride': { label: '🌿 Hybride', color: '#2ecc71', eco: true },
        'gpl': { label: '⛽ GPL', color: '#f39c12', eco: true },
        'essence': { label: '🚗 Essence', color: '#e74c3c', eco: false },
        'diesel': { label: '🚛 Diesel', color: '#c0392b', eco: false }
    },
    
    // Statuts des trajets
    RIDE_STATUS: {
        'active': { label: 'Actif', color: '#27ae60', icon: '🚀' },
        'started': { label: 'En cours', color: '#f39c12', icon: '🚗' },
        'completed': { label: 'Terminé', color: '#2ecc71', icon: '✅' },
        'cancelled': { label: 'Annulé', color: '#e74c3c', icon: '❌' }
    },
    
    // Préférences chauffeur
    DRIVER_PREFERENCES: {
        smoking_allowed: {
            'yes': { label: '🚬 Fumeur autorisé', color: '#e74c3c' },
            'no': { label: '🚭 Non-fumeur uniquement', color: '#27ae60' }
        },
        pets_allowed: {
            'yes': { label: '🐕 Tous animaux', color: '#f39c12' },
            'small': { label: '🐈 Petits animaux', color: '#2ecc71' },
            'no': { label: '🚫 Aucun animal', color: '#e74c3c' }
        },
        conversation_level: {
            'silent': { label: '🤫 Silencieux', color: '#95a5a6' },
            'moderate': { label: '💬 Conversation modérée', color: '#3498db' },
            'chatty': { label: '🗣️ Très bavard', color: '#9b59b6' }
        },
        music_preference: {
            'none': { label: '🔇 Pas de musique', color: '#95a5a6' },
            'soft': { label: '🎵 Musique douce', color: '#3498db' },
            'loud': { label: '🎶 Musique forte', color: '#e74c3c' }
        }
    },
    
    // Rôles utilisateur
    USER_ROLES: {
        'passenger': { label: 'Passager', color: '#3498db', permissions: ['book_rides'] },
        'driver': { label: 'Chauffeur', color: '#27ae60', permissions: ['create_rides', 'manage_vehicles'] },
        'admin': { label: 'Administrateur', color: '#e74c3c', permissions: ['*'] }
    }
};

// Fonction utilitaire pour récupérer l'URL de l'API
window.getApiUrl = (endpoint) => {
    return `${window.EcoRideConfig.API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};

// Fonction utilitaire pour les appels API sécurisés
window.fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };
    
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(url, finalOptions);
        
        // Gestion automatique de l'expiration de session
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/connexion.html';
            throw new Error(window.EcoRideConfig.ERROR_MESSAGES.UNAUTHORIZED);
        }
        
        return response;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
};

// Fonction utilitaire pour afficher des notifications
window.showNotification = (message, type = 'info', duration = 5000) => {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    notification.textContent = message;
    container.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
};

// Fonction utilitaire pour valider les données
window.validateData = {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    phone: (phone) => /^(\+33|0)[1-9](\d{8})$/.test(phone.replace(/\s/g, '')),
    licensePlate: (plate) => /^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(plate.toUpperCase()),
    password: (password) => password.length >= 8,
    required: (value) => value !== null && value !== undefined && value.toString().trim() !== ''
};

console.log('✅ Configuration EcoRide chargée');