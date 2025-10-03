// DOCUMENTATION API - ECORIDE
// Fichier: server/documentation/api-endpoints.md

# 📚 DOCUMENTATION API - ECORIDE

## 🔗 Base URL
```
http://localhost:3002/api
```

## 🔐 Authentification
Toutes les routes protégées nécessitent un header Authorization :
```
Authorization: Bearer <votre_token_jwt>
```

## 📋 Endpoints Disponibles

### 🏥 Santé du Système
- `GET /health` - État de santé du serveur et des bases de données
- `GET /metrics` - Métriques détaillées du système
- `GET /ping` - Test de connectivité simple

### 👤 Utilisateurs
- `POST /users/register` - Inscription d'un nouvel utilisateur
- `POST /users/login` - Connexion utilisateur
- `GET /users/profile` - Profil utilisateur (protégé)
- `PUT /users/profile` - Mise à jour du profil (protégé)

### 🚗 Véhicules
- `GET /vehicles` - Liste des véhicules (protégé)
- `POST /vehicles` - Ajouter un véhicule (protégé)
- `PUT /vehicles/:id` - Modifier un véhicule (protégé)
- `DELETE /vehicles/:id` - Supprimer un véhicule (protégé)

### 🚕 Covoiturages
- `GET /rides` - Liste des trajets disponibles
- `POST /rides` - Proposer un trajet (protégé)
- `GET /rides/:id` - Détails d'un trajet
- `PUT /rides/:id` - Modifier un trajet (protégé)
- `DELETE /rides/:id` - Supprimer un trajet (protégé)
- `POST /rides/:id/join` - Rejoindre un trajet (protégé)

### 💰 Crédits
- `GET /credits/balance` - Solde de crédits (protégé)
- `POST /credits/transfer` - Transférer des crédits (protégé)
- `GET /credits/history` - Historique des transactions (protégé)

## 🔒 Codes de Statut HTTP

- `200` - Succès
- `201` - Créé avec succès
- `400` - Requête invalide
- `401` - Non autorisé
- `403` - Accès interdit
- `404` - Ressource non trouvée
- `429` - Trop de requêtes (rate limiting)
- `500` - Erreur serveur

## 📊 Exemples de Réponses

### Succès
```json
{
  "success": true,
  "message": "Opération réussie",
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Description de l'erreur",
  "errors": [ ... ]
}
```

## 🛡️ Sécurité

- **Rate Limiting** : 100 requêtes/15min par IP
- **Validation** : Toutes les entrées sont validées
- **Authentification** : JWT avec expiration
- **CORS** : Configuré pour les domaines autorisés
- **Helmet** : Headers de sécurité HTTP