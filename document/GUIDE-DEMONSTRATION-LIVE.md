# 🎬 **GUIDE DÉMONSTRATION LIVE - EXAMEN ECORIDE**

*Script détaillé pour démonstration pratique et tests fonctionnels*  
*Durée totale: 35 minutes | Support technique complet*

---

## 🚀 **PRÉPARATION TECHNIQUE (Avant l'examen)**

### **📋 Checklist Pré-Démonstration**

#### **🖥️ Configuration Environnement**
- [ ] **Serveur Node.js** → Port 3000 fonctionnel
- [ ] **Base de données** → MongoDB + MySQL connectées
- [ ] **Données de test** → Utilisateurs, véhicules, trajets prêts
- [ ] **Terminal propre** → Historique effacé, prompt lisible
- [ ] **Navigateur** → Onglets organisés, cache vidé
- [ ] **Extensions** → DevTools ouverts, Network monitoring

#### **🗂️ Fichiers à Avoir Ouverts**
```
VS Code - Onglets préparés:
├── server/server.js (serveur principal)
├── server/controllers/userController.js (CRUD users)
├── server/controllers/vehicleController.js (CRUD véhicules)
├── server/controllers/rideController.js (CRUD trajets)
├── public/js/script.js (frontend JavaScript)
├── public/css/style.css (styles principaux)
└── document/PRESENTATION-EXAMEN-ECORIDE-35MIN.md
```

#### **🌐 Navigateur - Onglets Préparés**
1. **EcoRide Accueil** → `http://localhost:3000`
2. **Page Inscription** → `http://localhost:3000/creation-compte.html`
3. **Dashboard Utilisateur** → `http://localhost:3000/espace-utilisateur.html`
4. **Gestion Véhicules** → Interface modale prête
5. **Recherche Trajets** → `http://localhost:3000/covoiturages.html`

---

## ⏱️ **SCRIPT MINUTÉ DÉMONSTRATION (35 MINUTES)**

### **1. INTRODUCTION & SETUP** *(5 minutes)*

#### **Minute 0-1: Accueil & Présentation**
🎤 *"Bonjour, je suis Cyril Touchard. Je vais vous présenter EcoRide, ma plateforme de covoiturage écologique développée en full-stack. Suivez cette démonstration live de 35 minutes."*

**Actions:**
1. **Ouvrir VS Code** → Montrer architecture du projet
2. **Terminal** → Vérifier serveur actif
   ```bash
   cd /c/Users/cyril/OneDrive/Bureau/examen
   npm start
   # Vérifier : "Serveur démarré sur http://localhost:3000"
   ```

#### **Minute 1-3: Contexte & Enjeux**
🎤 *"Le transport représente 31% des émissions CO2. EcoRide répond à cette problématique avec une solution technique moderne."*

**Actions:**
1. **Afficher page d'accueil** → Design responsive
2. **Inspecter code HTML** → Structure sémantique
3. **DevTools Network** → Performances de chargement

#### **Minute 3-5: Architecture Technique**
🎤 *"Architecture full-stack: Node.js/Express, base hybride MongoDB+MySQL, sécurité JWT."*

**Actions:**
1. **Montrer server.js** → Configuration Express
   ```javascript
   // Ligne 15-25: Middleware sécurité
   app.use(helmet());
   app.use(cors());
   app.use(express.json());
   ```
2. **Fichier package.json** → Dépendances techniques

---

### **2. DÉMONSTRATION INSCRIPTION** *(8 minutes)*

#### **Minute 5-7: Processus d'Inscription**
🎤 *"Démonstration du parcours utilisateur complet, de l'inscription à la première connexion."*

**Actions:**
1. **Cliquer "S'inscrire"** → Redirection creation-compte.html
2. **Remplir formulaire live:**
   ```
   Prénom: Alex
   Nom: Martin
   Email: alex.martin@test.com
   Téléphone: 0123456789
   Mot de passe: TestSecure123!
   ```

3. **Montrer validation temps réel:**
   - Email invalide → Message d'erreur
   - Mot de passe faible → Indicateur sécurité
   - Téléphone incorrect → Format validation

#### **Minute 7-9: Validation Côté Client**
🎤 *"Code JavaScript pour validation interactive sans rechargement page."*

**Actions:**
1. **Ouvrir DevTools Console** → Montrer logs validation
2. **public/js/script.js** → Fonction validateEmail()
   ```javascript
   // Ligne 156-162: Validation email
   function validateEmail(email) {
       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!re.test(email)) {
           showError('email', 'Format email invalide');
           return false;
       }
       return true;
   }
   ```

#### **Minute 9-11: Traitement Backend**
🎤 *"Côté serveur: validation, hachage bcrypt, insertion base MongoDB."*

**Actions:**
1. **userController.js** → Fonction register()
   ```javascript
   // Ligne 45-70: Processus d'inscription
   const hashedPassword = await bcrypt.hash(password, 12);
   const newUser = new User({
       email,
       profile: { firstName, lastName, phone },
       credits: 20 // Crédits de bienvenue
   });
   ```

2. **Network DevTools** → Requête POST /api/users/register
3. **Réponse JSON** → Token JWT généré

#### **Minute 11-13: Première Connexion**
🎤 *"Connexion avec authentification JWT et redirection dashboard."*

**Actions:**
1. **Page connexion** → Saisir alex.martin@test.com
2. **DevTools Application** → localStorage token sauvé
3. **Dashboard utilisateur** → 20 crédits affichés
4. **Navigation conditionnelle** → Menu adapté utilisateur connecté

---

### **3. GESTION VÉHICULES CRUD** *(8 minutes)*

#### **Minute 13-15: Ajout Premier Véhicule**
🎤 *"CRUD complet véhicules avec validation multi-niveaux et interface moderne."*

**Actions:**
1. **Cliquer "Mes Véhicules"** → Interface vide pour nouvel utilisateur
2. **Bouton "Ajouter véhicule"** → Modal s'ouvre
3. **Remplir formulaire:**
   ```
   Marque: Toyota
   Modèle: Prius
   Année: 2022
   Type d'énergie: Hybride
   Nombre de places: 5
   Couleur: Blanc
   ```

#### **Minute 15-17: Code CRUD Backend**
🎤 *"Montrons le code qui traite cette création côté serveur."*

**Actions:**
1. **vehicleController.js** → createVehicle()
   ```javascript
   // Ligne 25-55: Validation et création
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   
   const vehicle = new Vehicle({
       ...req.body,
       userId: req.user.userId,
       createdAt: new Date()
   });
   
   await vehicle.save();
   ```

2. **DevTools Network** → POST /api/vehicles
3. **Réponse 201** → Véhicule créé avec ID

#### **Minute 17-19: Modification & Suppression**
🎤 *"Opérations UPDATE et DELETE en temps réel avec confirmations."*

**Actions:**
1. **Cliquer "Modifier"** → Modal pré-remplie
2. **Changer couleur** → Noir → Sauvegarder
3. **DevTools** → PUT /api/vehicles/:id
4. **Cliquer "Supprimer"** → Dialogue confirmation
5. **Confirmer** → DELETE /api/vehicles/:id

#### **Minute 19-21: Validation Sécurité**
🎤 *"Sécurité: seul propriétaire peut modifier ses véhicules."*

**Actions:**
1. **vehicleController.js** → Middleware auth
   ```javascript
   // Ligne 85-95: Vérification propriétaire
   const vehicle = await Vehicle.findOne({
       _id: vehicleId,
       userId: req.user.userId
   });
   
   if (!vehicle) {
       return res.status(404).json({
           message: 'Véhicule non trouvé ou non autorisé'
       });
   }
   ```

2. **Test sécurité** → Impossible modifier véhicule autre utilisateur

---

### **4. SYSTÈME TRAJETS AVANCÉ** *(8 minutes)*

#### **Minute 21-23: Proposition Nouveau Trajet**
🎤 *"Création trajet avec validation véhicule et calcul automatique."*

**Actions:**
1. **"Proposer un trajet"** → Formulaire complet
2. **Remplir:**
   ```
   Départ: Paris
   Arrivée: Lyon
   Date: Demain 14:00
   Prix: 25€
   Places: 3
   Véhicule: Toyota Prius (auto-sélection)
   ```

3. **Validation temps réel** → Date future, prix positif

#### **Minute 23-25: Code Backend Trajets**
🎤 *"Logique métier complexe avec validation croisée véhicule-utilisateur."*

**Actions:**
1. **rideController.js** → createRide()
   ```javascript
   // Ligne 30-65: Validation véhicule propriétaire
   const vehicle = await Vehicle.findOne({
       _id: vehicleId,
       userId: req.user.userId
   });
   
   if (!vehicle) {
       return res.status(400).json({
           message: 'Véhicule non autorisé'
       });
   }
   
   const ride = new Ride({
       driverId: req.user.userId,
       departure: { city: departure },
       destination: { city: destination },
       availableSeats: parseInt(seats),
       vehicleId: vehicle._id
   });
   ```

#### **Minute 25-27: Recherche & Filtrage**
🎤 *"Moteur de recherche avancé avec filtres multiples."*

**Actions:**
1. **Page covoiturages** → Barre de recherche
2. **Rechercher "Paris Lyon"** → Résultats filtrés
3. **DevTools** → GET /api/rides/search?departure=Paris&destination=Lyon
4. **Montrer JSON** → Trajets correspondants avec détails

#### **Minute 27-29: Réservation Temps Réel**
🎤 *"Système réservation avec gestion crédits et places disponibles."*

**Actions:**
1. **Cliquer "Réserver"** sur un trajet
2. **Confirmation** → Modal avec détails prix
3. **Valider réservation** → POST /api/rides/:id/reserve
4. **Mise à jour** → Places disponibles -1, crédits utilisateur -25

---

### **5. ARCHITECTURE & SÉCURITÉ** *(4 minutes)*

#### **Minute 29-31: Sécurité JWT**
🎤 *"Démonstration protection routes et expiration tokens."*

**Actions:**
1. **DevTools Application** → Montrer token JWT
2. **jwt.io** → Décoder payload token
3. **Middleware auth.js** → Vérification token
   ```javascript
   // Ligne 10-25: Validation JWT
   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
       if (err) return res.sendStatus(403);
       req.user = user;
       next();
   });
   ```

4. **Test token expiré** → Erreur 403 Forbidden

#### **Minute 31-33: Base Données Hybride**
🎤 *"MongoDB pour flexibilité, MySQL pour intégrité transactionnelle."*

**Actions:**
1. **MongoDB Compass** → Collections users, vehicles, rides
2. **MySQL Workbench** → Table credits_transactions
3. **db.js** → Connexions duales
   ```javascript
   // MongoDB connection
   mongoose.connect(process.env.MONGODB_URI);
   
   // MySQL connection  
   const mysql = require('mysql2');
   const pool = mysql.createPool(process.env.MYSQL_CONFIG);
   ```

---

### **6. CONCLUSION & QUESTIONS** *(2 minutes)*

#### **Minute 33-35: Bilan & Perspectives**
🎤 *"Récapitulatif technique et évolutions futures."*

**Actions:**
1. **Montrer documentation** → Guide CRUD complet
2. **Architecture diagram** → Vue d'ensemble système
3. **Points clés:**
   - ✅ Full-stack fonctionnel et sécurisé
   - ✅ CRUD complets avec validation
   - ✅ Architecture évolutive
   - ✅ Code maintenable et documenté

4. **Questions du jury** → Préparé pour approfondissements

---

## 🛠️ **TROUBLESHOOTING DÉMONSTRATION**

### **🚨 Problèmes Potentiels & Solutions**

#### **Serveur ne démarre pas**
```bash
# Vérifications:
netstat -an | grep :3000  # Port occupé?
npm install               # Dépendances complètes?
node --version           # Version compatible?
```

#### **Base de données inaccessible**
```bash
# MongoDB
mongod --version
mongo "mongodb://localhost:27017/ecoride"

# MySQL  
mysql -u root -p
USE ecoride;
SHOW TABLES;
```

#### **Erreurs JavaScript Frontend**
1. **Ouvrir DevTools Console** → Identifier erreurs
2. **Network Failed** → Vérifier CORS config server
3. **Token Invalid** → Regénérer nouvelle session

#### **Fonctionnalités qui ne marchent pas**
1. **CRUD Véhicules** → Vérifier routes /api/vehicles
2. **Authentification** → Token localStorage présent?
3. **Validation** → express-validator configuré?

---

## 📱 **SUPPORT MATÉRIEL DÉMONSTRATION**

### **💻 Configuration Écran**
- **Écran principal** → VS Code + Terminal
- **Écran secondaire** → Navigateur + DevTools
- **Zoom navigateur** → 110% pour visibilité
- **Taille police VS Code** → 14px minimum

### **🎥 Enregistrement (Optionnel)**
```bash
# OBS Studio settings pour backup
Résolution: 1920x1080
FPS: 30
Audio: Micro + système
Sortie: MP4 H.264
```

### **⚡ Raccourcis Clavier Utiles**
- **F12** → DevTools
- **Ctrl+Shift+I** → Inspecter élément
- **Ctrl+R** → Refresh page
- **Ctrl+Shift+C** → Select element
- **Alt+Tab** → Switch applications

---

## 🎯 **POINTS D'ATTENTION JURY**

### **🔍 Questions Probables**
1. **Pourquoi architecture hybride MongoDB+MySQL?**
2. **Comment gérez-vous la sécurité utilisateur?**
3. **Évolutivité et scalabilité du système?**
4. **Tests et validation du code?**
5. **Performance et optimisations?**

### **💡 Réponses Préparées**
- **Hybride DB** → Flexibilité NoSQL + Intégrité SQL
- **Sécurité** → JWT + bcrypt + validation multi-niveaux
- **Scalabilité** → API REST stateless, structure modulaire
- **Tests** → Validation express-validator + tests manuels
- **Performance** → Pagination, indexes DB, cache localStorage

---

## ✅ **VALIDATION FINALE**

### **📋 Checklist Jour J**
- [ ] Serveur démarré et fonctionnel
- [ ] Données test prêtes et cohérentes
- [ ] Tous onglets navigateur préparés
- [ ] VS Code organisé avec bons fichiers
- [ ] DevTools configurés et prêts
- [ ] Documentation accessible rapidement
- [ ] Timer 35 minutes configuré
- [ ] Questions probables révisées

**🎬 DÉMONSTRATION PRÊTE → SUCCÈS ASSURÉ !**