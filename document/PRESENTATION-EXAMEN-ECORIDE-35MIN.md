# 🎯 **PRÉSENTATION ECORIDE - EXAMEN ECF (35 MINUTES)**

*Script complet pour soutenance projet covoiturage écologique*  
*Date : 9 octobre 2025 | Candidat : Touchard Cyril*

---

## ⏱️ **PLANNING CHRONOMÉTRÉ (35 MINUTES)**

### **1. INTRODUCTION & CONTEXTE** *(5 minutes)*
- Présentation personnelle et projet
- Objectifs et enjeux du covoiturage écologique
- Vision technique et innovation

### **2. DÉMONSTRATION UTILISATEUR** *(8 minutes)*
- Parcours d'inscription et connexion
- Recherche et réservation de trajets
- Gestion du profil et véhicules

### **3. ARCHITECTURE TECHNIQUE** *(12 minutes)*
- Stack technologique et justifications
- Base de données hybride MySQL + MongoDB
- Sécurité et authentification JWT
- Architecture API REST

### **4. DÉVELOPPEMENT & CRUD** *(8 minutes)*
- Opérations CRUD détaillées
- Gestion d'état et validation
- Code review des fonctionnalités clés

### **5. QUALITÉ & PERSPECTIVES** *(2 minutes)*
- Tests et documentation
- Évolutions futures et améliorations

---

## 🚀 **1. INTRODUCTION & CONTEXTE** *(5 minutes)*

### **Accroche d'Ouverture** *(1 minute)*
*"Bonjour, je suis Cyril Touchard et je vais vous présenter EcoRide, une plateforme de covoiturage qui répond aux enjeux actuels de mobilité durable. En 35 minutes, je vais vous démontrer comment cette application full-stack allie innovation technique et impact écologique."*

### **Problématique & Solution** *(2 minutes)*

**🌍 CONTEXTE ENVIRONNEMENTAL**
- Transport = 31% des émissions CO2 en France
- 1 trajet sur 2 effectué seul en voiture
- Besoin urgent de solutions de mobilité partagée

**💡 SOLUTION ECORIDE**
- Plateforme web moderne de covoiturage
- Interface intuitive et responsive
- Système de crédits gamifié (20 crédits offerts)
- Focus sur l'impact écologique et l'économie

### **Objectifs Techniques** *(2 minutes)*

**🎯 DÉFIS TECHNIQUES RELEVÉS**
- **Sécurité** : Authentification JWT + chiffrement bcrypt
- **Performance** : Architecture hybride base de données
- **Évolutivité** : API REST modulaire et maintenable
- **Expérience** : Interface responsive mobile-first

**📊 CHIFFRES CLÉS**
- 15+ pages fonctionnelles
- 4 entités CRUD complètes (Users, Vehicles, Rides, Reviews)
- 20+ endpoints API sécurisés
- Support multi-dispositifs (desktop, tablette, mobile)

---

## 👥 **2. DÉMONSTRATION UTILISATEUR** *(8 minutes)*

### **Parcours d'Inscription** *(2 minutes)*

**🔗 DÉMONSTRATION LIVE**
1. **Page d'accueil** → Navigation vers inscription
   - Design moderne et professionnel
   - Call-to-action clair "Rejoindre EcoRide"
   
2. **Formulaire d'inscription** → Validation en temps réel
   ```javascript
   // Validation côté client
   function validateEmail(email) {
       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return re.test(email);
   }
   ```
   - Contrôles de saisie interactifs
   - Messages d'erreur contextuels
   - 20 crédits offerts automatiquement

### **Connexion & Tableau de Bord** *(2 minutes)*

**🔐 AUTHENTIFICATION SÉCURISÉE**
```javascript
// JWT Token Management
const token = localStorage.getItem('ecoride_token');
fetch('/api/user/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
});
```

**📊 DASHBOARD PERSONNEL**
- Solde de crédits en temps réel
- Historique des trajets (proposés/réservés)
- Statistiques personnelles d'impact écologique
- Navigation contextuelle selon le statut utilisateur

### **Gestion des Véhicules** *(2 minutes)*

**🚗 CRUD VÉHICULES COMPLET**
1. **Ajout de véhicule** → Interface modale moderne
   - Types d'énergie (Essence, Diesel, Électrique, Hybride, GPL)
   - Validation des données côté client/serveur
   
2. **Modification/Suppression** → Actions en temps réel
   ```javascript
   // Update véhicule avec gestion d'erreurs
   async function updateVehicle(vehicleData) {
       try {
           const response = await fetch(`/api/vehicles/${vehicleId}`, {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(vehicleData)
           });
           return await response.json();
       } catch (error) {
           console.error('Erreur mise à jour véhicule:', error);
       }
   }
   ```

### **Recherche & Réservation** *(2 minutes)*

**🔍 MOTEUR DE RECHERCHE AVANCÉ**
- Recherche par ville de départ/arrivée
- Filtrage par date et critères écologiques
- Affichage temps réel des places disponibles

**🎫 SYSTÈME DE RÉSERVATION**
- Validation en temps réel des crédits
- Gestion automatique des places
- Confirmation instantanée par notification

---

## 🏗️ **3. ARCHITECTURE TECHNIQUE** *(12 minutes)*

### **Stack Technologique** *(3 minutes)*

**📋 JUSTIFICATIONS TECHNIQUES**

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **Frontend** | HTML5/CSS3/JS | Performance, compatibilité, maintenance |
| **Backend** | Node.js/Express | Écosystème riche, performance, JavaScript full-stack |
| **Base de Données** | MongoDB + MySQL | Flexibilité NoSQL + Intégrité relationnelle |
| **Authentification** | JWT | Stateless, scalable, sécurisé |
| **Sécurité** | bcrypt + Helmet | Chiffrement robuste + Protection headers |

**🎨 DESIGN SYSTEM**
```css
/* Charte graphique cohérente */
:root {
    --primary-color: #2e8b57;    /* Vert EcoRide */
    --secondary-color: #4682b4;  /* Bleu confiance */
    --accent-color: #ffa500;     /* Orange action */
    --text-primary: #333;
    --bg-gradient: linear-gradient(135deg, #2e8b57, #4682b4);
}
```

### **Base de Données Hybride** *(4 minutes)*

**🔄 ARCHITECTURE HYBRIDE : POURQUOI ?**

**MongoDB (NoSQL) → Données Flexibles**
```javascript
// Schéma Utilisateur avec historique évolutif
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    profile: {
        firstName: String,
        lastName: String,
        phone: String,
        profilePicture: String
    },
    preferences: {
        smokingAllowed: Boolean,
        petsAllowed: Boolean,
        musicPreference: String
    },
    history: [{
        action: String,
        timestamp: Date,
        details: mongoose.Schema.Types.Mixed
    }]
});
```

**MySQL (SQL) → Données Transactionnelles**
```sql
-- Table crédits avec intégrité ACID
CREATE TABLE credits_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('earning', 'spending') NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);
```

**⚡ AVANTAGES COMBINÉS**
- MongoDB : Évolutivité schémas, performance lectures massives
- MySQL : Transactions ACID, intégrité référentielle, analytique

### **Sécurité Multi-Niveaux** *(3 minutes)*

**🛡️ LAYERS DE SÉCURITÉ**

**1. Authentification JWT**
```javascript
const jwt = require('jsonwebtoken');

// Génération token avec expiration
const generateToken = (userId) => {
    return jwt.sign(
        { userId, timestamp: Date.now() },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Middleware validation
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
```

**2. Chiffrement Passwords**
```javascript
const bcrypt = require('bcryptjs');

// Hash avec salt rounds optimisé
const hashPassword = async (password) => {
    const saltRounds = 12; // Équilibre sécurité/performance
    return await bcrypt.hash(password, saltRounds);
};
```

**3. Protection Headers & Rate Limiting**
```javascript
// Configuration Helmet sécurité
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"]
        }
    }
}));

// Rate limiting par IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite 100 requêtes par IP
    message: "Trop de requêtes, réessayez plus tard"
});
```

### **API REST Architecture** *(2 minutes)*

**🔗 ENDPOINTS STRUCTURÉS**

```javascript
// Structure modulaire des routes
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/vehicles', authenticateToken, vehicleRoutes);
app.use('/api/rides', authenticateToken, rideRoutes);
app.use('/api/reviews', authenticateToken, reviewRoutes);

// Contrôleur avec gestion d'erreurs
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Utilisateur non trouvé' 
            });
        }
        
        res.json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                profile: user.profile,
                credits: user.credits
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
};
```

---

## 💻 **4. DÉVELOPPEMENT & CRUD** *(8 minutes)*

### **Opérations CRUD Complètes** *(4 minutes)*

**🚗 CRUD VÉHICULES (US8)**

**CREATE - Ajout véhicule**
```javascript
// Frontend - Validation avant envoi
const addVehicle = async (vehicleData) => {
    // Validation côté client
    if (!vehicleData.brand || !vehicleData.model) {
        throw new Error('Marque et modèle requis');
    }
    
    const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('ecoride_token')}`
        },
        body: JSON.stringify(vehicleData)
    });
    
    return await response.json();
};

// Backend - Contrôleur avec validation
const createVehicle = async (req, res) => {
    try {
        // Validation express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Création véhicule MongoDB
        const vehicle = new Vehicle({
            ...req.body,
            userId: req.user.userId,
            createdAt: new Date()
        });
        
        await vehicle.save();
        
        res.status(201).json({
            success: true,
            data: vehicle,
            message: 'Véhicule ajouté avec succès'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la création' 
        });
    }
};
```

**READ - Récupération avec filtres**
```javascript
// Recherche avancée avec pagination
const getVehicles = async (req, res) => {
    const { page = 1, limit = 10, energyType, brand } = req.query;
    
    // Construction query dynamique
    let filter = { userId: req.user.userId };
    if (energyType) filter.energyType = energyType;
    if (brand) filter.brand = new RegExp(brand, 'i');
    
    const vehicles = await Vehicle.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
        
    const total = await Vehicle.countDocuments(filter);
    
    res.json({
        success: true,
        data: vehicles,
        pagination: {
            current: page,
            total: Math.ceil(total / limit),
            count: vehicles.length
        }
    });
};
```

**🛣️ CRUD TRAJETS (US9)**

**CREATE - Proposition trajet complexe**
```javascript
const createRide = async (req, res) => {
    try {
        const { departure, destination, date, price, seats, vehicleId } = req.body;
        
        // Validation véhicule appartient à l'utilisateur
        const vehicle = await Vehicle.findOne({
            _id: vehicleId,
            userId: req.user.userId
        });
        
        if (!vehicle) {
            return res.status(400).json({
                success: false,
                message: 'Véhicule non trouvé ou non autorisé'
            });
        }
        
        // Création trajet avec calcul distance
        const ride = new Ride({
            driverId: req.user.userId,
            departure: {
                city: departure.city,
                coordinates: departure.coordinates
            },
            destination: {
                city: destination.city,
                coordinates: destination.coordinates
            },
            date: new Date(date),
            price: parseFloat(price),
            totalSeats: parseInt(seats),
            availableSeats: parseInt(seats),
            vehicleId: vehicle._id,
            status: 'active'
        });
        
        await ride.save();
        
        res.status(201).json({
            success: true,
            data: ride,
            message: 'Trajet proposé avec succès'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du trajet'
        });
    }
};
```

### **Gestion d'État Avancée** *(2 minutes)*

**🔄 STATE MANAGEMENT CLIENT**

```javascript
// Gestionnaire d'état global application
class EcoRideState {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.vehicles = [];
        this.rides = [];
        this.notifications = [];
    }
    
    // Mise à jour état utilisateur
    setUser(userData) {
        this.user = userData;
        this.isAuthenticated = true;
        this.updateUI();
        this.saveToLocalStorage();
    }
    
    // Synchronisation avec localStorage
    saveToLocalStorage() {
        localStorage.setItem('ecoride_state', JSON.stringify({
            user: this.user,
            isAuthenticated: this.isAuthenticated
        }));
    }
    
    // Restauration état au chargement
    restoreFromLocalStorage() {
        const saved = localStorage.getItem('ecoride_state');
        if (saved) {
            const state = JSON.parse(saved);
            this.user = state.user;
            this.isAuthenticated = state.isAuthenticated;
        }
    }
    
    // Mise à jour interface selon état
    updateUI() {
        const isLoggedIn = this.isAuthenticated;
        
        // Navigation conditionnelle
        document.getElementById('nav-login').style.display = 
            isLoggedIn ? 'none' : 'block';
        document.getElementById('nav-profile').style.display = 
            isLoggedIn ? 'block' : 'none';
            
        // Contenu personnalisé
        if (isLoggedIn && this.user) {
            document.getElementById('user-credits').textContent = 
                `${this.user.credits} crédits`;
        }
    }
}

// Instance globale
const appState = new EcoRideState();
```

### **Validation & Sécurité** *(2 minutes)*

**✅ VALIDATION MULTI-NIVEAUX**

```javascript
// Validation côté serveur avec express-validator
const { body, validationResult } = require('express-validator');

const vehicleValidationRules = () => {
    return [
        body('brand')
            .isLength({ min: 2, max: 50 })
            .withMessage('Marque entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
            .withMessage('Marque contient des caractères invalides'),
            
        body('model')
            .isLength({ min: 1, max: 50 })
            .withMessage('Modèle entre 1 et 50 caractères'),
            
        body('year')
            .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
            .withMessage('Année invalide'),
            
        body('energyType')
            .isIn(['essence', 'diesel', 'electrique', 'hybride', 'gpl'])
            .withMessage('Type d\'énergie invalide'),
            
        body('seats')
            .isInt({ min: 1, max: 9 })
            .withMessage('Nombre de places entre 1 et 9')
    ];
};

// Middleware de validation
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
            message: 'Données invalides'
        });
    }
    next();
};

// Utilisation dans les routes
app.post('/api/vehicles', 
    authenticateToken, 
    vehicleValidationRules(), 
    validate, 
    createVehicle
);
```

---

## 🔬 **5. QUALITÉ & PERSPECTIVES** *(2 minutes)*

### **Documentation & Tests** *(30 secondes)*

**📚 DOCUMENTATION COMPLÈTE**
- Documentation technique de 1000+ lignes
- Guide CRUD détaillé avec exemples
- Manuel utilisateur interactif
- Diagrammes UML et architecture
- **🐳 Nouveau** : Guide Docker complet avec containerisation

**🧪 STRATÉGIE DE TESTS**
```javascript
// Tests unitaires exemple
describe('Vehicle Controller', () => {
    test('should create vehicle with valid data', async () => {
        const vehicleData = {
            brand: 'Toyota',
            model: 'Prius',
            year: 2022,
            energyType: 'hybride',
            seats: 5
        };
        
        const response = await request(app)
            .post('/api/vehicles')
            .set('Authorization', `Bearer ${validToken}`)
            .send(vehicleData)
            .expect(201);
            
        expect(response.body.success).toBe(true);
        expect(response.body.data.brand).toBe('Toyota');
    });
});
```

### **Évolutions Futures** *(1 minute)*

**🚀 ROADMAP TECHNIQUE**
- **🐳 Docker Production** : Containerisation complète déjà implémentée
- **☁️ Cloud Native** : Déploiement Azure Container Apps
- **⚡ Temps réel** : WebSocket pour notifications instantanées
- **📱 Mobile** : Progressive Web App (PWA) avec cache offline
- **🤖 AI** : Recommandations de trajets avec machine learning
- **📊 Scale** : Microservices et orchestration Kubernetes

**🌱 IMPACT ÉCOLOGIQUE**
- Calcul empreinte carbone économisée
- Gamification avec badges écologiques
- Partenariats avec collectivités locales
- Intégration transports en commun

---

## 🎯 **CONCLUSION & QUESTIONS**

**📊 BILAN TECHNIQUE**
- ✅ Application full-stack fonctionnelle et sécurisée
- ✅ Architecture moderne et évolutive
- ✅ CRUD complets avec validation robuste
- ✅ Interface responsive et accessible
- ✅ Documentation professionnelle complète

**💡 VALEUR AJOUTÉE**
- Solution technique innovante aux enjeux de mobilité
- Code maintenable et professionnel
- Sécurité et performance optimisées
- Impact écologique positif démontrable

*"Je vous remercie pour votre attention et reste à votre disposition pour vos questions."*

---

## 📋 **ANNEXES TECHNIQUES**

### **Checklist Démonstration**
- [ ] Terminal et serveur prêts
- [ ] Base de données initialisée avec données test
- [ ] Navigation entre toutes les pages
- [ ] Fonctionnalités CRUD testées
- [ ] Code review préparé
- [ ] Documentation accessible

### **Points d'Attention Jury**
- Justification choix techniques
- Sécurité et gestion d'erreurs
- Code quality et bonnes pratiques
- Scalabilité et maintenance
- Impact business et utilisateur

### **Backup Slides**
- Diagrammes UML détaillés
- Code source commenté
- Tests et métriques performance
- Comparaison solutions alternatives