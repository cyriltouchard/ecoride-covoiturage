# 📚 **DOCUMENTATION DÉTAILLÉE - FONCTIONS CRUD ECORIDE**

*Version 2.0 - Guide complet des opérations CRUD (Create, Read, Update, Delete)*

---

## 🎯 **VUE D'ENSEMBLE DES CRUD**

Votre projet EcoRide implémente des opérations CRUD complètes pour plusieurs entités :

| **Entité** | **Create** | **Read** | **Update** | **Delete** | **Architecture** |
|------------|------------|----------|------------|------------|------------------|
| **Utilisateurs** | ✅ | ✅ | ✅ | ✅ | Hybride (MySQL + MongoDB) |
| **Véhicules** | ✅ | ✅ | ✅ | ✅ | Hybride (MySQL + MongoDB) |
| **Trajets** | ✅ | ✅ | ✅ | ✅ | Hybride (MySQL + MongoDB) |
| **Crédits** | ✅ | ✅ | ✅ | ❌ | MySQL (transactionnel) |
| **Évaluations** | ✅ | ✅ | ✅ | ✅ | MongoDB (flexibilité) |

---

## 🚗 **1. CRUD VÉHICULES (US8) - DÉTAIL COMPLET**

### **📍 Routes API (vehicleRoutes.js)**

```javascript
// CREATE - Ajouter un véhicule
POST /api/vehicles
// Middleware: requireDriver (vérification rôle chauffeur)

// READ - Lire véhicules
GET /api/vehicles/me           // Tous mes véhicules
GET /api/vehicles/:id          // Véhicule spécifique
GET /api/vehicles/driver-profile // Profil complet chauffeur

// UPDATE - Modifier véhicule
PUT /api/vehicles/:id          // Mise à jour véhicule

// DELETE - Supprimer véhicule
DELETE /api/vehicles/:id       // Suppression logique

// BONUS - Préférences chauffeur
POST /api/vehicles/preferences  // Créer préférences
GET /api/vehicles/preferences   // Lire préférences
```

### **🏗️ CREATE - Création de véhicule**

**Endpoint:** `POST /api/vehicles`

```javascript
// Données requises
{
  "brand": "Tesla",              // Marque (string, requis)
  "model": "Model 3",            // Modèle (string, requis)
  "color": "Blanc",              // Couleur (string)
  "license_plate": "AB-123-CD",  // Plaque (string, unique)
  "first_registration": "2023",  // Année (number)
  "energy_type": "electrique",   // Type énergie (enum)
  "available_seats": 4           // Places (number, 1-8)
}
```

**Logique métier :**
1. ✅ **Validation utilisateur** : Vérification rôle chauffeur
2. ✅ **Validation données** : Types, formats, contraintes
3. ✅ **Unicité plaque** : Vérification base de données
4. ✅ **Transaction MySQL** : Insertion sécurisée
5. ✅ **Synchronisation MongoDB** : Données étendues (optionnel)

**Réponse succès :**
```javascript
{
  "success": true,
  "message": "Véhicule ajouté avec succès",
  "data": {
    "id": 123,
    "user_id": 456,
    "brand": "Tesla",
    "model": "Model 3",
    "is_ecological": true,
    // ... autres champs
  }
}
```

### **📖 READ - Lecture de véhicules**

#### **GET /api/vehicles/me - Mes véhicules**

```sql
SELECT v.*, 
       CASE WHEN v.energy_type = 'electrique' THEN true ELSE false END as is_ecological,
       COUNT(r.id) as rides_count
FROM vehicles v
LEFT JOIN rides r ON v.id = r.vehicle_id
WHERE v.user_id = ? AND v.is_active = TRUE
GROUP BY v.id
ORDER BY v.created_at DESC
```

**Fonctionnalités :**
- ✅ **Filtrage propriétaire** : Seuls vos véhicules
- ✅ **Calcul écologique** : Auto-détection véhicules verts
- ✅ **Statistiques** : Nombre de trajets par véhicule
- ✅ **Tri chronologique** : Plus récents en premier

#### **GET /api/vehicles/:id - Véhicule spécifique**

```javascript
// Validation et sécurité
const vehicleId = parseInt(req.params.id);
const userId = req.user.id;

// Vérification propriété
const vehicle = await VehicleSQL.getById(vehicleId, userId);
```

### **✏️ UPDATE - Modification de véhicule**

**Endpoint:** `PUT /api/vehicles/:id`

**Champs modifiables :**
```javascript
const allowedFields = [
  'brand',           // Marque
  'model',           // Modèle  
  'color',           // Couleur
  'energy_type',     // Type d'énergie
  'available_seats'  // Nombre de places
];

// Note: license_plate non modifiable (sécurité)
```

**Logique de mise à jour :**
1. ✅ **Validation ID** : Vérification format numérique
2. ✅ **Validation propriété** : Seul le propriétaire peut modifier
3. ✅ **Filtrage champs** : Seuls les champs autorisés
4. ✅ **Validation données** : Types et contraintes
5. ✅ **Mise à jour atomique** : Transaction sécurisée

### **🗑️ DELETE - Suppression de véhicule**

**Endpoint:** `DELETE /api/vehicles/:id`

```javascript
// Suppression logique (soft delete)
static async delete(vehicleId, userId) {
    const [result] = await pool.execute(
        'UPDATE vehicles SET is_active = FALSE WHERE id = ? AND user_id = ?',
        [vehicleId, userId]
    );
    
    return result.affectedRows > 0;
}
```

**Avantages suppression logique :**
- ✅ **Préservation données** : Historique conservé
- ✅ **Intégrité référentielle** : Trajets passés préservés
- ✅ **Audit trail** : Traçabilité complète
- ✅ **Récupération possible** : Restauration si nécessaire

---

## 🛣️ **2. CRUD TRAJETS (US9) - DÉTAIL COMPLET**

### **📍 Routes API (rideRoutes.js)**

```javascript
// CREATE - Créer trajet
POST /api/rides

// READ - Lire trajets
GET /api/rides                 // Recherche publique
GET /api/rides/search         // Recherche avancée
GET /api/rides/my-rides       // Mes trajets
GET /api/rides/:id            // Trajet spécifique

// UPDATE - Modifier trajet
PUT /api/rides/:id            // Mise à jour
PATCH /api/rides/:id/status   // Changement statut

// DELETE - Supprimer trajet
DELETE /api/rides/:id         // Annulation trajet
```

### **🏗️ CREATE - Création de trajet**

**Endpoint:** `POST /api/rides`

```javascript
// Données requises
{
  "vehicle_id": 123,                    // ID véhicule (requis)
  "departure": "Paris",                 // Ville départ (requis)
  "arrival": "Lyon",                    // Ville arrivée (requis)
  "departure_date": "2025-10-15",      // Date départ (requis)
  "departure_time": "14:00",           // Heure départ (requis)
  "available_seats": 3,                // Places dispo (requis)
  "price": 25.50,                      // Prix par passager (requis)
  "description": "Trajet confortable"  // Description (optionnel)
}
```

**Logique métier avancée :**
1. ✅ **Validation véhicule** : Propriété et existence
2. ✅ **Déduction crédits** : -2 crédits automatiques (commission)
3. ✅ **Vérification solde** : Crédits suffisants
4. ✅ **Double stockage** : MySQL (relationnel) + MongoDB (recherche)
5. ✅ **Statut initial** : "active" par défaut

### **📖 READ - Recherche de trajets**

#### **GET /api/rides/search - Recherche avancée**

```javascript
// Paramètres de recherche
{
  "departure": "Paris",        // Ville départ
  "arrival": "Lyon",           // Ville arrivée
  "date": "2025-10-15",       // Date
  "passengers": 2,            // Nombre passagers
  "energy_filter": "eco"      // Filtre écologique
}
```

**Requête SQL optimisée :**
```sql
SELECT r.*, v.brand, v.model, v.energy_type, u.pseudo as driver_name,
       CASE WHEN v.energy_type = 'electrique' THEN 1 ELSE 0 END as is_eco
FROM rides r
JOIN vehicles v ON r.vehicle_id = v.id
JOIN users u ON r.driver_id = u.id
WHERE r.departure LIKE ? 
  AND r.arrival LIKE ?
  AND DATE(r.departure_date) = ?
  AND r.available_seats >= ?
  AND r.status = 'active'
ORDER BY is_eco DESC, r.departure_time ASC
```

### **✏️ UPDATE - Modification de trajet**

**Types de modifications :**

1. **Modification complète** (`PUT /api/rides/:id`)
2. **Changement de statut** (`PATCH /api/rides/:id/status`)

```javascript
// Statuts possibles
const validStatuses = ['active', 'in_progress', 'completed', 'cancelled'];

// Transitions autorisées
active → in_progress → completed
active → cancelled
```

### **🗑️ DELETE - Annulation de trajet**

```javascript
// Logique d'annulation
exports.deleteRide = async (req, res) => {
    // 1. Vérifier propriété
    // 2. Vérifier statut (seuls 'active' peuvent être annulés)
    // 3. Rembourser les crédits (+2)
    // 4. Notifier les passagers réservés
    // 5. Changer statut vers 'cancelled'
};
```

---

## 👤 **3. CRUD UTILISATEURS - DÉTAIL COMPLET**

### **📍 Routes API (userRoutes.js)**

```javascript
// CREATE - Inscription
POST /api/users/register

// READ - Profil
GET /api/users/me             // Mon profil
GET /api/users/profile/:id    // Profil public

// UPDATE - Modification
PUT /api/users/profile        // Mise à jour profil
PATCH /api/users/type        // Changement type utilisateur

// AUTHENTICATION - Authentification
POST /api/users/login        // Connexion
POST /api/users/logout       // Déconnexion
```

### **🏗️ CREATE - Inscription utilisateur**

```javascript
// Données d'inscription
{
  "pseudo": "JohnDoe",              // Pseudo unique
  "email": "john@example.com",      // Email unique
  "password": "motdepasse123",      // Mot de passe (8+ chars)
  "user_type": "passager"           // Type : passager/chauffeur/chauffeur_passager
}
```

**Sécurité implémentée :**
- ✅ **Hachage bcrypt** : Salt rounds = 12
- ✅ **Validation email** : Format et unicité
- ✅ **Validation pseudo** : Unicité et format
- ✅ **Crédits de bienvenue** : +20 crédits automatiques

---

## 💰 **4. CRUD CRÉDITS - SYSTÈME TRANSACTIONNEL**

### **📍 Routes API (creditRoutes.js)**

```javascript
// READ - Consultation
GET /api/credits/balance      // Solde actuel
GET /api/credits/history     // Historique transactions

// CREATE - Transactions
POST /api/credits/add        // Ajouter crédits
POST /api/credits/deduct     // Déduire crédits (interne)

// Pas de UPDATE/DELETE : Intégrité transactionnelle
```

### **🏗️ Logique transactionnelle**

```javascript
// Exemple de déduction pour trajet
static async deductCredits(userId, amount, reason) {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        // 1. Vérifier solde
        const [balance] = await connection.execute(
            'SELECT SUM(amount) as total FROM credit_transactions WHERE user_id = ?',
            [userId]
        );
        
        if (balance[0].total < amount) {
            throw new Error('Crédits insuffisants');
        }
        
        // 2. Créer transaction
        await connection.execute(
            'INSERT INTO credit_transactions (user_id, amount, transaction_type, description) VALUES (?, ?, ?, ?)',
            [userId, -amount, 'deduction', reason]
        );
        
        await connection.commit();
        return true;
        
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
```

---

## 🔒 **5. SÉCURITÉ ET VALIDATION CRUD**

### **Authentication & Authorization**

```javascript
// Middleware d'authentification
const authenticateToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ message: 'Token requis' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

// Middleware de rôle chauffeur
const requireDriver = (req, res, next) => {
    if (!['chauffeur', 'chauffeur_passager'].includes(req.user.user_type)) {
        return res.status(403).json({ 
            message: 'Accès réservé aux chauffeurs' 
        });
    }
    next();
};
```

### **Validation des données**

```javascript
// Exemple validation véhicule
static validateVehicleData(data) {
    const errors = [];
    
    if (!data.brand || data.brand.length < 2) {
        errors.push('Marque requise (min 2 caractères)');
    }
    
    if (!data.license_plate || !/^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(data.license_plate)) {
        errors.push('Format plaque invalide (XX-123-XX)');
    }
    
    if (!['essence', 'diesel', 'electrique', 'hybride', 'gpl'].includes(data.energy_type)) {
        errors.push('Type d\'énergie invalide');
    }
    
    if (data.available_seats < 1 || data.available_seats > 8) {
        errors.push('Nombre de places invalide (1-8)');
    }
    
    return errors;
}
```

---

## 📊 **6. PERFORMANCE ET OPTIMISATION**

### **Indexation base de données**

```sql
-- Index pour recherche rapide
CREATE INDEX idx_rides_search ON rides(departure, arrival, departure_date, status);
CREATE INDEX idx_vehicles_user ON vehicles(user_id, is_active);
CREATE INDEX idx_credits_user ON credit_transactions(user_id);

-- Index unique pour contraintes
CREATE UNIQUE INDEX idx_vehicles_plate ON vehicles(license_plate) WHERE is_active = TRUE;
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

### **Cache et pagination**

```javascript
// Pagination automatique
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const offset = (page - 1) * limit;

const [rides, [{ total }]] = await Promise.all([
    pool.execute(query + ' LIMIT ? OFFSET ?', [...params, limit, offset]),
    pool.execute(countQuery, params)
]);

return {
    data: rides,
    pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
    }
};
```

---

## 🧪 **7. TESTS ET VALIDATION**

### **Tests unitaires exemple**

```javascript
describe('Vehicle CRUD Operations', () => {
    test('Should create vehicle with valid data', async () => {
        const vehicleData = {
            user_id: 1,
            brand: 'Tesla',
            model: 'Model 3',
            license_plate: 'EV-123-TS',
            energy_type: 'electrique',
            available_seats: 4
        };
        
        const vehicle = await VehicleSQL.create(vehicleData);
        expect(vehicle.id).toBeDefined();
        expect(vehicle.is_ecological).toBe(true);
    });
    
    test('Should reject duplicate license plate', async () => {
        // Test unicité plaque...
    });
});
```

---

## 🎯 **RÉSUMÉ COMPÉTENCES CRUD DÉMONTRÉES**

### ✅ **Fonctionnalités avancées implémentées**

| **Aspect** | **Implémentation** | **Niveau** |
|------------|-------------------|------------|
| **Architecture** | Hybride MySQL + MongoDB | Expert |
| **Sécurité** | JWT + bcrypt + validation | Avancé |
| **Transactions** | ACID + rollback | Professionnel |
| **Performance** | Index + pagination | Optimisé |
| **Validation** | Côté serveur + client | Complet |
| **Error Handling** | Try/catch + messages | Robuste |

### 🏆 **Points d'excellence ECF**

1. **Architecture hybride** : MySQL pour relationnel + MongoDB pour flexibilité
2. **Sécurité multi-niveaux** : Authentication, autorisation, validation
3. **Intégrité transactionnelle** : Système de crédits ACID-compliant
4. **Performance optimisée** : Index, pagination, cache
5. **Code maintenable** : Structure MVC, séparation des responsabilités

---

*📋 Votre implémentation CRUD dépasse largement les exigences ECF avec une architecture professionnelle et des fonctionnalités avancées !*