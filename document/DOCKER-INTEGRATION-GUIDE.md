# 🐳 **INTÉGRATION DOCKER ECORIDE**

*Guide complet pour containeriser et déployer EcoRide avec Docker*  
*Version 1.0 - 9 octobre 2025*

---

## 🚀 **INSTALLATION RAPIDE**

### **📋 Prérequis**
- Docker Desktop installé
- Docker Compose (inclus avec Docker Desktop)
- Git (pour cloner le projet)

### **⚡ Démarrage en 3 commandes**
```bash
# 1. Cloner le projet (si pas déjà fait)
git clone https://github.com/cyriltouchard/ecoride-covoiturage.git
cd ecoride-covoiturage

# 2. Construire et lancer tous les services
docker-compose up --build -d

# 3. Vérifier que tout fonctionne
docker-compose ps
```

### **🌐 Accès aux services**
- **EcoRide App** : http://localhost:3000
- **MongoDB Admin** : http://localhost:8081 (admin/admin)
- **MySQL Admin** : http://localhost:8082 (ecoride_user/ecoride_secure_password)

---

## 🏗️ **ARCHITECTURE DOCKER**

### **📦 Services Containerisés**
```
┌─────────────────────────────────────────────┐
│                EcoRide Stack                │
├─────────────────────────────────────────────┤
│  🌐 ecoride-app:3000    (Application)      │
│  🍃 ecoride-mongo:27017 (MongoDB)          │
│  🐬 ecoride-mysql:3306  (MySQL)            │
│  📊 mongo-express:8081  (Mongo Admin)      │
│  📈 phpmyadmin:8082     (MySQL Admin)      │
└─────────────────────────────────────────────┘
```

### **🔗 Réseau Interne**
- **Network** : `ecoride-network` (bridge)
- **Communication** : Services communiquent par nom
- **Isolation** : Sécurité par containerisation

### **💾 Persistance Données**
- **MongoDB** : Volume `ecoride_mongo_data`
- **MySQL** : Volume `ecoride_mysql_data`
- **Logs** : Montage `./logs` vers `/app/logs`

---

## 🛠️ **COMMANDES DOCKER UTILES**

### **🚀 Gestion des Services**
```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Redémarrer un service spécifique
docker-compose restart ecoride-app

# Voir les logs d'un service
docker-compose logs -f ecoride-app

# Voir le status de tous les services
docker-compose ps
```

### **🔧 Développement**
```bash
# Reconstruire l'image application
docker-compose build ecoride-app

# Redémarrer après modification code
docker-compose up --build ecoride-app

# Exécuter des commandes dans le conteneur
docker-compose exec ecoride-app npm run health

# Accéder au shell du conteneur
docker-compose exec ecoride-app sh
```

### **🧹 Maintenance**
```bash
# Nettoyer les volumes (⚠️ SUPPRIME LES DONNÉES)
docker-compose down -v

# Nettoyer les images non utilisées
docker image prune -f

# Voir l'utilisation des ressources
docker stats

# Sauvegarder les volumes
docker run --rm -v ecoride_mongo_data:/data -v $(pwd):/backup alpine tar czf /backup/mongo-backup.tar.gz /data
```

---

## 🔧 **CONFIGURATION AVANCÉE**

### **🌍 Variables d'Environnement**

**Créer un fichier `.env` :**
```env
# Application
NODE_ENV=production
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# MongoDB
MONGODB_URI=mongodb://ecoride-mongo:27017/ecoride
MONGO_ADMIN_USER=admin
MONGO_ADMIN_PASSWORD=admin_password

# MySQL
MYSQL_HOST=ecoride-mysql
MYSQL_PORT=3306
MYSQL_DATABASE=ecoride
MYSQL_USER=ecoride_user
MYSQL_PASSWORD=ecoride_secure_password
MYSQL_ROOT_PASSWORD=root_secure_password

# Sécurité
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_key
```

### **📊 Monitoring et Santé**
```bash
# Vérifier la santé des conteneurs
docker-compose exec ecoride-app curl -f http://localhost:3000/api/health

# Voir les logs en temps réel
docker-compose logs -f --tail=100 ecoride-app

# Statistiques de performance
docker stats ecoride-backend ecoride-mongodb ecoride-mysql
```

### **🔐 Sécurité Production**
```yaml
# docker-compose.prod.yml
services:
  ecoride-app:
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    restart: always
```

---

## 🚀 **DÉPLOIEMENT PRODUCTION**

### **☁️ Déploiement Cloud**
```bash
# Build pour production
docker build -t ecoride:latest .

# Tag pour registry
docker tag ecoride:latest your-registry.com/ecoride:latest

# Push vers registry
docker push your-registry.com/ecoride:latest

# Déploiement sur serveur distant
docker-compose -f docker-compose.prod.yml up -d
```

### **🔄 CI/CD avec GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy EcoRide
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and Deploy
        run: |
          docker build -t ecoride:latest .
          docker-compose up -d
```

### **📈 Scaling Horizontal**
```bash
# Lancer plusieurs instances de l'app
docker-compose up --scale ecoride-app=3 -d

# Load balancer avec Nginx
# (Configuration nginx séparée requise)
```

---

## 🔍 **TROUBLESHOOTING**

### **❌ Problèmes Courants**

#### **Port déjà utilisé**
```bash
# Vérifier les ports occupés
netstat -tulpn | grep :3000

# Changer le port dans docker-compose.yml
ports:
  - "3001:3000"  # Port externe:interne
```

#### **Problème de connexion BDD**
```bash
# Vérifier la connectivité
docker-compose exec ecoride-app ping ecoride-mongo
docker-compose exec ecoride-app ping ecoride-mysql

# Redémarrer les services de BDD
docker-compose restart ecoride-mongo ecoride-mysql
```

#### **Permissions fichiers**
```bash
# Corriger les permissions (Linux/Mac)
sudo chown -R $USER:$USER ./logs
chmod 755 ./logs

# Windows avec WSL2
wsl --exec sudo chown -R $(id -u):$(id -g) ./logs
```

### **🛠️ Debug Mode**
```bash
# Lancer en mode développement avec logs détaillés
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up

# Variables de debug
DEBUG=ecoride:* docker-compose up
```

---

## 📊 **AVANTAGES DOCKER POUR ECORIDE**

### **✅ Avantages Techniques**

#### **🔒 Isolation et Sécurité**
- Applications isolées dans conteneurs
- Pas de conflits entre dépendances
- Environnement contrôlé et reproductible

#### **⚡ Performance**
- Démarrage rapide (< 30 secondes)
- Ressources optimisées par conteneur
- Scaling horizontal facile

#### **🛠️ Développement**
- Environnement identique dev/prod
- Onboarding nouveaux devs simplifié
- Tests isolés et reproductibles

#### **🚀 Déploiement**
- Déploiement en une commande
- Rollback instantané possible
- Zero-downtime deployment possible

### **📈 Métriques de Performance**
```bash
# Temps de démarrage complet
docker-compose up -d  # ~30-45 secondes

# Utilisation mémoire moyenne
# ecoride-app: ~150MB
# MongoDB: ~100MB  
# MySQL: ~200MB
# Total: ~450MB
```

---

## 🎯 **INTÉGRATION DANS PRÉSENTATION ECF**

### **💡 Points à Mentionner (2-3 minutes)**

#### **"Containerisation avec Docker"**
🎤 *"Pour la mise en production, j'ai préparé une containerisation Docker complète. Cela apporte plusieurs avantages cruciaux..."*

#### **Avantages Présentés**
1. **Portabilité** : "Fonctionne identique sur tout environnement"
2. **Scalabilité** : "Scaling horizontal avec docker-compose scale"
3. **Maintenance** : "Rollback instantané, zero-downtime"
4. **Sécurité** : "Isolation des services, permissions contrôlées"

#### **Démonstration Rapide** *(si temps)*
```bash
# Une seule commande lance tout l'environnement
docker-compose up -d

# L'application est accessible en moins d'une minute
# Bases de données initialisées automatiquement
# Interface d'administration incluse
```

### **🏆 Impact Professionnel**
- Montre une **vision moderne** du déploiement
- Démontre la **maîtrise des outils DevOps**
- Prépare le projet pour la **production réelle**
- Facilite la **collaboration en équipe**

---

## 📚 **RESSOURCES COMPLÉMENTAIRES**

### **📖 Documentation**
- [Docker Official Docs](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node)

### **🔧 Outils Recommandés**
- **Docker Desktop** : Interface graphique
- **Portainer** : Management interface web
- **Docker Scout** : Analyse sécurité images

### **🌐 Évolutions Futures**
- **Kubernetes** : Orchestration avancée
- **Helm Charts** : Package management K8s
- **Monitoring** : Prometheus + Grafana
- **CI/CD** : GitHub Actions / GitLab CI

---

## ✅ **CHECKLIST DÉPLOIEMENT**

### **🎯 Avant Production**
- [ ] Variables d'environnement sécurisées
- [ ] Secrets externalisés (pas dans le code)
- [ ] HTTPS configuré avec certificats SSL
- [ ] Monitoring et alertes configurés
- [ ] Backups automatiques planifiés
- [ ] Tests de charge effectués
- [ ] Plan de disaster recovery défini

### **🚀 Go-Live**
```bash
# 1. Build production
docker build -t ecoride:prod .

# 2. Test local
docker-compose -f docker-compose.prod.yml up -d

# 3. Deploy
./deploy-production.sh
```

**🐳 ECORIDE DOCKERISÉ → PRÊT POUR LA PRODUCTION !**