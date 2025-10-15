# 🎯 Plan de Maquettage Figma - EcoRide

**Date:** 15 octobre 2025  
**Objectif:** Créer les maquettes essentielles pour l'examen ECF

---

## ✅ PHASE 1 : ESSENTIEL EXAMEN (Priorité HAUTE)

### Pages à créer dans Figma

| # | Page | Basé sur | Temps estimé | Statut |
|---|------|----------|--------------|--------|
| 1 | **Page d'accueil** | `screen-home.svg` | 30 min | ⏳ À faire |
| 2 | **Recherche trajets** | `screen-search-results.svg` | 30 min | ⏳ À faire |
| 3 | **Détails trajet** | `screen-ride-details.svg` | 45 min | ⏳ À faire |
| 4 | **Créer un trajet** | `screen-create-ride.svg` | 45 min | ⏳ À faire |
| 5 | **Profil utilisateur** | `screen-user-profile.svg` | 30 min | ⏳ À faire |

**Total temps:** ~3h  
**Suffisant pour:** Démonstration examen complète ✅

---

## 🔄 PHASE 2 : COMPLÉMENTAIRE (Priorité MOYENNE)

Si vous avez le temps, ajoutez :

| # | Page | Fichier HTML existant | Temps estimé |
|---|------|-----------------------|--------------|
| 6 | **Connexion** | `connexion.html` | 20 min |
| 7 | **Inscription** | `creation-compte.html` | 30 min |
| 8 | **Admin dashboard** | `admin.html` | 45 min |
| 9 | **Espace employé** | `employe.html` | 30 min |

**Total temps:** +2h

---

## 📱 PHASE 3 : RESPONSIVE (Priorité BASSE)

Uniquement si tout le reste est fait :

| Tâche | Description | Temps |
|-------|-------------|-------|
| Mobile | Adapter les 5 écrans essentiels en 375px | 2h |
| Tablette | Adapter en 768px | 1h30 |

---

## 🎨 Workflow recommandé

### 1️⃣ **Setup initial (30 min)**
```
✅ Créer fichier Figma "EcoRide - Maquettes"
✅ Page 1: "Design System"
   → Importer colors-typography.svg
   → Créer Color Styles
   → Créer Text Styles

✅ Page 2: "Components"
   → Importer boutons, inputs, icônes
   → Créer Components Figma
   → Ajouter variantes (hover, active)
```

### 2️⃣ **Créer les 5 écrans essentiels (3h)**
```
Pour CHAQUE écran:
1. Importer le screen-*.svg correspondant (5 min)
2. Analyser la structure (2 min)
3. Créer un nouveau frame 1440x900 (1 min)
4. Recréer en utilisant VOS composants (20-30 min)
5. Ajouter les vrais textes de votre site (5 min)
6. Remplacer par vos vraies images (5 min)
7. Ajuster espacements et alignements (5 min)
```

### 3️⃣ **Prototypage (1h)**
```
✅ Page 3: "Prototype"
   → Lier les 5 écrans entre eux
   → Ajouter transitions (Smart Animate)
   → Créer flow utilisateur complet
   → Tester le parcours
```

---

## ❓ Questions fréquentes

### **Q: Les screens SVG ne ressemblent pas à mon site, c'est grave ?**
**R:** Non ! Ce sont des **templates de base** à personnaliser. Vous devez :
- Garder la structure générale (layout, sections)
- Changer les textes pour vos vrais contenus
- Remplacer les images placeholders par vos vraies images
- Ajuster les couleurs si besoin (mais la palette est cohérente)

### **Q: Je dois créer TOUTES mes pages ?**
**R:** Non ! Pour l'examen, **5 écrans principaux suffisent** :
1. Accueil
2. Recherche
3. Détails trajet
4. Création trajet
5. Profil

Les autres pages (connexion, admin, etc.) sont **optionnelles**.

### **Q: Je pars des SVG ou je crée from scratch ?**
**R:** **Utilisez les SVG comme référence** mais recréez dans Figma :
1. Ouvrez le SVG dans Figma
2. Analysez la structure
3. Créez un nouveau frame vide
4. Recréez en utilisant vos composants Figma (boutons, inputs)
5. Utilisez Auto Layout pour rendre responsive

**Pourquoi ?** Les SVG importés ne sont pas modifiables facilement. En recréant avec des composants Figma, vous aurez :
- Des maquettes modifiables
- Des composants réutilisables
- Un prototype interactif
- Un export facile vers le développement

### **Q: Combien de temps ça va prendre ?**
**R:** 
- **Minimum viable (5 écrans):** 3-4 heures
- **Complet (9 écrans + responsive):** 8-10 heures
- **Pour l'examen:** 5 écrans = LARGEMENT SUFFISANT

---

## ✅ Checklist finale

Avant de considérer vos maquettes "terminées" :

### Design System
- [ ] Toutes les couleurs sont en Color Styles
- [ ] Tous les textes utilisent des Text Styles
- [ ] Logo importé et vectorisé
- [ ] Composants créés (boutons, inputs, cards)

### Écrans principaux (les 5 essentiels)
- [ ] Page d'accueil
- [ ] Recherche de trajets
- [ ] Détails d'un trajet
- [ ] Créer un trajet
- [ ] Profil utilisateur

### Prototype
- [ ] Les écrans sont liés entre eux
- [ ] Les boutons ont des interactions
- [ ] Le flow utilisateur fonctionne
- [ ] Transitions ajoutées (optionnel)

### Documentation
- [ ] Nom des frames clair (ex: "Home - Desktop - Default")
- [ ] Composants nommés et organisés
- [ ] Pages bien structurées

---

## 🎯 Mon conseil

**Pour l'examen ECF:**

✅ **Faites BIEN les 5 écrans essentiels** plutôt que d'en faire 15 rapidement  
✅ **Créez un prototype interactif** pour impressionner le jury  
✅ **Utilisez les SVG comme inspiration**, pas comme copie  
✅ **Concentrez-vous sur la cohérence** du design system  

**Les 5 écrans + prototype interactif = 95% de la note design**

---

## 📞 Besoin d'aide ?

Si vous bloquez sur Figma :
1. Consultez `FIGMA-STARTER-README.md` (guide complet)
2. Regardez les SVG comme référence
3. Suivez le workflow ci-dessus étape par étape

**Bon courage ! 🚀**
