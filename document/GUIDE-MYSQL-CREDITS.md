# 🚀 GUIDE DE DÉMARRAGE MYSQL + CRÉDITS - EcoRide ECF

## ✅ CE QUI A ÉTÉ IMPLÉMENTÉ

### 1. **Architecture Hybride Conforme ECF**
- ✅ **MySQL** (Base relationnelle OBLIGATOIRE)
- ✅ **MongoDB** (Base NoSQL pour sessions/profils)
- ✅ **Système de crédits complet** (20 crédits initiaux)
- ✅ **API REST sécurisée** avec JWT

### 2. **Fichiers Créés/Modifiés**
```
✅ server/database/init_mysql.sql      - Schéma complet MySQL
✅ server/models/userSQLModel.js       - Modèle utilisateur MySQL
✅ server/models/creditModel.js        - Système de crédits
✅ server/routes/creditRoutes.js       - API endpoints crédits
✅ server/controllers/userController.js - Contrôleur hybride
✅ server/middleware/auth.js           - Auth hybride + rôles
✅ server/config/db-mysql.js          - Connexion MySQL
✅ server/.env                        - Variables environnement
```

## 🔧 PROCHAINES ÉTAPES OBLIGATOIRES

### **ÉTAPE 1 : Démarrer MySQL**
```bash
# Option A: XAMPP (recommandé)
1. Ouvrir XAMPP Control Panel
2. Démarrer "MySQL"

# Option B: Service Windows
net start mysql

# Option C: Installation MySQL Workbench
Télécharger depuis : https://dev.mysql.com/downloads/workbench/
```

### **ÉTAPE 2 : Créer la base de données**
```bash
# Une fois MySQL démarré, exécuter :
cd "C:/Users/cyril/OneDrive/Bureau/examen/server"
node test-mysql.js

# Si succès, créer le schéma :
mysql -u root -p < database/init_mysql.sql
# OU importer init_mysql.sql via phpMyAdmin/MySQL Workbench
```

### **ÉTAPE 3 : Tester le système**
```bash
cd "C:/Users/cyril/OneDrive/Bureau/examen/server"
npm start

# Le serveur devrait afficher :
# ✅ Connexion MySQL réussie ! Base: ecoride_sql
# ✅ Connexion à MongoDB réussie ! Hôte: localhost
# Serveur EcoRide démarré sur le port 3002
```

## 🧪 TESTS API DISPONIBLES

### **1. Inscription (avec crédits automatiques)**
```javascript
POST http://127.0.0.1:3002/api/users/register
{
    "pseudo": "testuser",
    "email": "test@example.com", 
    "password": "password123"
}
// Répond avec token + 20 crédits automatiques
```

### **2. Connexion**
```javascript
POST http://127.0.0.1:3002/api/users/login
{
    "email": "test@example.com",
    "password": "password123"
}
```

### **3. Vérifier les crédits**
```javascript
GET http://127.0.0.1:3002/api/credits/balance
Headers: x-auth-token: VOTRE_TOKEN
```

### **4. Historique des crédits**
```javascript
GET http://127.0.0.1:3002/api/credits/history
Headers: x-auth-token: VOTRE_TOKEN
```

## 🎯 CONFORMITÉ ECF ACTUELLE

### ✅ **EXIGENCES RESPECTÉES**
- [x] Base de données relationnelle (MySQL)
- [x] Base de données NoSQL (MongoDB) 
- [x] Système de crédits (20 initiaux + transactions)
- [x] Architecture sécurisée (JWT + Helmet)
- [x] API REST structurée
- [x] Gestion des rôles utilisateur

### ⏳ **PROCHAINES PRIORITÉS**
1. **US8-9** : Espace utilisateur complet (véhicules, trajets)
2. **US4-6** : Système de réservation avec crédits
3. **US12-13** : Interfaces employé/admin

## 🆘 DÉPANNAGE

### **Erreur MySQL "Connection refused"**
```bash
# Vérifier que MySQL est démarré
# Windows: Gestionnaire des tâches > Services > MySQL
# XAMPP: Control Panel > MySQL > Start
```

### **Erreur "Database not exists"**
```bash
# Créer manuellement la base :
mysql -u root -p
CREATE DATABASE ecoride_sql;
exit
```

### **Erreur de permissions**
```bash
# Dans .env, ajuster :
DB_PASSWORD=votre_mot_de_passe_mysql
# OU laisser vide si pas de mot de passe
```

## 🎉 SUCCÈS ATTENDU

Quand tout fonctionne, vous devriez voir :
```
🔄 Test de connexion MySQL...
✅ Connexion MySQL réussie !
✅ Base de données ecoride_sql créée/vérifiée
📋 Tables existantes: [users, user_credits, vehicles, ...]
✅ Pool MySQL configuré: Pool MySQL opérationnel
```

**🚀 PRÊT POUR LA SUITE !** Votre fondation MySQL + crédits est maintenant conforme aux exigences ECF.