# 🚗 EcoRide - Plateforme de Covoiturage Écologique

![EcoRide Logo](public/images/logo.png)

## 📋 Description

EcoRide est une plateforme web moderne de covoiturage écologique développée dans le cadre du **Titre Professionnel Développeur Web et Web Mobile**. L'objectif est de mettre en relation des conducteurs et des passagers pour partager des trajets, en mettant l'accent sur l'économie et l'écologie.

Cette application full-stack combine une interface utilisateur moderne avec un backend robuste pour offrir une expérience de covoiturage complète et sécurisée.

## ✨ Fonctionnalités

### 🔐 Authentification & Gestion Utilisateur
- ✅ Inscription et connexion sécurisées avec JWT
- ✅ Gestion de profil utilisateur avec photo
- ✅ Système de crédits (20 crédits offerts à l'inscription)
- ✅ Tableau de bord personnel complet
- ✅ Navigation dynamique selon le statut de connexion

### 🚙 Gestion des Véhicules
- ✅ Ajout/modification/suppression de véhicules
- ✅ Support de différents types d'énergie (Essence, Diesel, Électrique, Hybride, GPL)
- ✅ Validation des données véhicule côté client et serveur
- ✅ Interface modale pour les modifications

### 🛣️ Covoiturages
- ✅ Recherche avancée de trajets par ville de départ/arrivée et date
- ✅ Proposition de nouveaux trajets avec détails complets
- ✅ Système de réservation en temps réel
- ✅ Filtrage par critères écologiques
- ✅ Gestion automatique des places disponibles
- ✅ Historique des trajets proposés et réservés

### 💬 Support Client Intégré
- ✅ **Chat en direct** avec interface moderne
- ✅ Réponses automatiques intelligentes contextuelles
- ✅ Interface responsive (desktop et mobile)
- ✅ Messagerie instantanée avec horodatage

### 👨‍💼 Administration
- ✅ Panel d'administration dédié
- ✅ Gestion des employés et utilisateurs
- ✅ Interface d'administration moderne
- ✅ Contrôle des accès par rôles

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique et accessible
- **CSS3** - Styles modernes, responsive design et animations
- **JavaScript ES6+** - Logique côté client moderne
- **Font Awesome 5.15.4** - Bibliothèque d'icônes
- **Google Fonts** - Typographie (Roboto, Poppins)

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB avec validation
- **JWT** - Authentification par tokens sécurisés
- **bcryptjs** - Chiffrement des mots de passe (salt=12)
- **CORS** - Gestion sécurisée des requêtes cross-origin
- **Helmet** - Middleware de sécurité HTTP
- **express-validator** - Validation des données d'entrée

## 📦 Installation

### Prérequis
- **Node.js** (v16 ou plus récent) - [Télécharger](https://nodejs.org/)
- **MongoDB** (local ou Atlas) - [Installation](https://www.mongodb.com/try/download/community)
- **npm** ou **yarn** (généralement inclus avec Node.js)
- **Git** pour le clonage du projet

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/ecoride.git
cd ecoride
```

### 2. Installation des dépendances serveur
```bash
cd server
npm install
```

### 3. Configuration de l'environnement
Créez un fichier `.env` dans le dossier `server/` :
```env
# Configuration serveur
PORT=3002
NODE_ENV=development

# Base de données MongoDB
MONGO_URI=mongodb://localhost:27017/ecoride

# Sécurité JWT
JWT_SECRET=VotreSecretTresFortPourLeJWT

# Configuration CORS (optionnel)
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:5500
```

### 4. Démarrage de MongoDB
```bash
# Si MongoDB est installé localement
mongod

# Ou utilisez MongoDB Compass pour une interface graphique
# Ou configurez MongoDB Atlas pour une solution cloud
```

### 5. Lancement du serveur
```bash
# Mode développement (recommandé)
npm run dev

# Mode production
npm start
```
**Le serveur sera accessible sur** `http://localhost:3002` 🚀

### 6. Ouverture du frontend
- **Option 1** : Ouvrez `index.html` avec **Live Server** (VS Code)
- **Option 2** : Utilisez un serveur local comme `http-server`
- **Option 3** : Double-cliquez sur `index.html` (moins recommandé)

## 🚀 Utilisation

### Démarrage rapide
1. **Démarrez MongoDB** (`mongod` ou MongoDB Compass)
2. **Lancez le serveur backend** : `cd server && npm run dev`
3. **Ouvrez le frontend** avec Live Server ou navigateur
4. **Créez un compte** ou connectez-vous avec un compte existant
5. **Explorez** : Ajoutez vos véhicules, proposez ou recherchez des trajets !
6. **Testez le chat** : Cliquez sur le bouton "Chat" dans la navigation

### URLs principales
- **🏠 Accueil** : `index.html` - Page d'accueil avec présentation
- **🔍 Recherche** : `covoiturages.html` - Recherche et filtrage de trajets
- **🔐 Connexion** : `connexion.html` - Authentification utilisateur
- **📝 Inscription** : `creation-compte.html` - Création de compte (20 crédits offerts)
- **👤 Tableau de bord** : `espace-utilisateur.html` - Gestion complète du profil
- **🚗 Proposer un trajet** : `proposer-covoiturage.html` - Publication de nouveaux trajets
- **👨‍💼 Administration** : `admin.html` - Panel d'administration
- **📞 Contact** : `contact.html` - Formulaire de contact

### 🌐 API Backend
- **Base URL** : `http://localhost:3002/api`
- **Documentation** : Voir section [API Documentation](#-api-documentation)

## 🏗️ Architecture

```
ecoride/
├── server/                 # Backend Node.js
│   ├── config/            # Configuration DB
│   ├── controllers/       # Logique métier
│   ├── middleware/        # Middlewares Express
│   ├── models/           # Modèles MongoDB
│   ├── routes/           # Routes API
│   └── server.js         # Point d'entrée serveur
├── public/               # Ressources statiques
│   ├── css/             # Feuilles de style
│   ├── js/              # Scripts frontend
│   ├── images/          # Images et médias
│   └── videos/          # Vidéos
├── document/            # Documentation technique
└── *.html              # Pages web
```

## 🔒 Sécurité

### Mesures implémentées
- ✅ **Chiffrement des mots de passe** avec bcrypt (salt=12)
- ✅ **Authentification JWT** sécurisée avec expiration (1h)
- ✅ **Protection CORS** configurée avec origines autorisées
- ✅ **Headers de sécurité** avec Helmet.js
- ✅ **Validation XSS** côté frontend et backend
- ✅ **Validation stricte des données** avec express-validator
- ✅ **Variables d'environnement** pour tous les secrets
- ✅ **Middleware d'authentification** pour les routes protégées

### Bonnes pratiques respectées
- 🔒 Mots de passe minimum 8 caractères avec validation
- ⏰ Tokens JWT avec expiration automatique (1h)
- 🛡️ Sanitisation automatique des entrées utilisateur
- 🔐 Gestion sécurisée des sessions utilisateur
- 📊 Logs de sécurité et monitoring des erreurs

## 🌱 Fonctionnalités Écologiques

- 🌿 **Filtre écologique** pour privilégier les véhicules verts
- 📊 **Indicateur CO2** sur les trajets (à venir)
- ⚡ **Promotion des véhicules électriques/hybrides** dans l'interface
- 📈 **Statistiques d'impact environnemental** (à venir)
- 🏆 **Système de points écologiques** basé sur le type de véhicule

## 📱 Responsive Design

- 📱 **Mobile First** - Optimisé pour tous les écrans (320px à 4K)
- 🍔 **Navigation adaptative** avec menu hamburger pour mobile
- 💬 **Chat responsive** - S'adapte automatiquement à la taille d'écran
- 🖼️ **Images optimisées** pour différentes résolutions
- ⚡ **Performance mobile** optimisée avec lazy loading

## 🧪 Tests & Qualité

### Standards respectés
- ✅ Code **HTML5 sémantique** validé W3C
- ✅ **CSS3 moderne** sans propriétés obsolètes
- ✅ **Accessibilité WCAG** respectée (ARIA labels, navigation clavier)
- ✅ **SEO optimisé** (meta tags, Open Graph, Twitter Cards)

### Performance
- ⚡ Optimisation des images et ressources
- 🗜️ CSS organisé et optimisé (2000+ lignes)
- 💾 Cache navigateur configuré
- 🚀 Chargement asynchrone des scripts

## 🔧 Scripts NPM

```bash
# Développement avec auto-reload
npm run dev

# Production
npm start

# Tests (à implémenter)
npm test

# Linting (à implémenter)
npm run lint
```

## 📖 API Documentation

### Endpoints principaux

#### Authentification
- `POST /api/users/register` - Inscription utilisateur
- `POST /api/users/login` - Connexion et récupération du token JWT
- `GET /api/users/me` - Profil utilisateur connecté (protégé)

#### Véhicules
- `GET /api/vehicles/me` - Liste des véhicules de l'utilisateur (protégé)
- `POST /api/vehicles` - Ajouter un nouveau véhicule (protégé)
- `PUT /api/vehicles/:id` - Modifier un véhicule existant (protégé)
- `DELETE /api/vehicles/:id` - Supprimer un véhicule (protégé)

#### Trajets (Covoiturages)
- `GET /api/rides` - Liste publique des trajets disponibles
- `GET /api/rides/search` - Recherche de trajets avec filtres
- `POST /api/rides` - Proposer un nouveau trajet (protégé)
- `GET /api/rides/:id` - Détails d'un trajet spécifique
- `POST /api/rides/:id/book` - Réserver une place sur un trajet (protégé)
- `DELETE /api/rides/:id` - Supprimer un trajet proposé (protégé)

### Format des réponses
```json
{
  "success": true,
  "data": { ... },
  "message": "Action réalisée avec succès"
}
```

### Authentification
Ajoutez le header suivant pour les routes protégées :
```
x-auth-token: [votre_token_jwt]
```

## 🤝 Contribution

Ce projet est ouvert aux contributions ! Voici comment participer :

### Processus de contribution
1. **Fork** le projet sur GitHub
2. **Clonez** votre fork : `git clone https://github.com/votre-username/ecoride.git`
3. **Créez** une branche feature : `git checkout -b feature/nouvelle-fonctionnalite`
4. **Commitez** vos changements : `git commit -am 'Ajout: nouvelle fonctionnalité'`
5. **Push** vers la branche : `git push origin feature/nouvelle-fonctionnalite`
6. **Ouvrez** une Pull Request avec description détaillée

### Conventions de code
- **JavaScript** : ES6+, camelCase, JSDoc pour les fonctions importantes
- **CSS** : BEM methodology, variables CSS pour les couleurs
- **HTML** : Sémantique, accessibilité ARIA
- **Commits** : Messages clairs en français ou anglais

## 🐛 Signalement de bugs

Pour signaler un bug :
1. Vérifiez qu'il n'existe pas déjà dans les [Issues](https://github.com/votre-username/ecoride/issues)
2. Créez une nouvelle issue avec :
   - Description détaillée du problème
   - Étapes pour reproduire
   - Environnement (OS, navigateur, version Node.js)
   - Captures d'écran si nécessaire

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs & Contributeurs

- **Cyril Touchard** - *Développeur Full-Stack* - Projet dans le cadre du Titre Professionnel Développeur Web et Web Mobile
- **Formation** - [Nom de votre organisme de formation]

### Remerciements spéciaux
- **Formateurs** pour l'accompagnement technique
- **Communauté** des développeurs pour les ressources partagées

## 🙏 Remerciements & Ressources

### Bibliothèques et outils utilisés
- [Font Awesome](https://fontawesome.com/) pour les icônes
- [Google Fonts](https://fonts.google.com/) pour la typographie (Roboto, Poppins)
- [MongoDB](https://www.mongodb.com/) pour la base de données
- [Express.js](https://expressjs.com/) pour le framework backend
- [Node.js](https://nodejs.org/) pour l'environnement d'exécution

### Inspiration et ressources
- La communauté open source pour les bonnes pratiques
- Documentation officielle MDN pour les standards web
- Guides de sécurité OWASP pour les pratiques sécurisées

## 📞 Support & Contact

### 🆘 Besoin d'aide ?
- **Documentation** : Consultez ce README complet
- **Chat en direct** : Utilisez le chat intégré sur le site
- **Issues GitHub** : [Signaler un problème](https://github.com/votre-username/ecoride/issues)

### 📧 Contact professionnel
- **Email** : contact@ecoride.fr
- **LinkedIn** : [Votre profil LinkedIn]
- **Portfolio** : [Votre site web]

### 🚀 Déploiement et production
Pour un déploiement en production, consultez les guides :
- **Frontend** : Netlify, Vercel, GitHub Pages
- **Backend** : Heroku, DigitalOcean, AWS
- **Base de données** : MongoDB Atlas (recommandé)

---

## 🎯 Objectifs pédagogiques atteints

Ce projet démontre la maîtrise de :
- ✅ **Développement Full-Stack** JavaScript moderne
- ✅ **Architecture MVC** et séparation des responsabilités  
- ✅ **API RESTful** avec authentification JWT
- ✅ **Base de données NoSQL** avec MongoDB
- ✅ **Sécurité web** et bonnes pratiques
- ✅ **Responsive Design** et accessibilité
- ✅ **Git et versionning** de code
- ✅ **Documentation technique** complète

---

**EcoRide** - *Voyagez plus vert, ensemble !* 🌱✨

> **Note** : Ce projet est réalisé dans un cadre pédagogique. Pour toute utilisation commerciale, veuillez contacter l'auteur.