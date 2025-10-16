# 🎨 Pack Figma EcoRide - Screens Fidèles au Site

**Date:** 16 octobre 2025  
**Version:** 2.1 - Screens avec menu burger et footer complet  
**Auteur:** Équipe EcoRide

---

## 📦 Contenu du Pack

Ce dossier contient **5 screens SVG haute-fidélité** basés exactement sur votre site EcoRide actuel.

### ✅ Les 5 écrans essentiels

| Fichier | Page correspondante | Taille | Description |
|---------|---------------------|--------|-------------|
| `01-page-accueil.svg` | `index.html` | 1440x1100 | Page d'accueil avec hero vidéo, présentation, avantages + FOOTER |
| `02-recherche-covoiturages.svg` | `covoiturages.html` | 1440x1100 | Recherche de trajets avec filtres et résultats + FOOTER |
| `03-details-covoiturage.svg` | `details-covoiturage.html` | 1440x1200 | Détails d'un trajet avec infos conducteur et réservation + FOOTER |
| `04-proposer-covoiturage.svg` | `proposer-covoiturage.html` | 1440x1200 | Formulaire de création de trajet + FOOTER |
| `05-mon-espace.svg` | `espace-utilisateur.html` | 1440x1200 | Dashboard utilisateur avec véhicules et trajets + FOOTER |

### 📄 Documentation
| Fichier | Description |
|---------|-------------|
| `README-PACK-FIGMA.md` | Guide complet d'utilisation (ce fichier) |
| `GUIDE-CAPTURE-VIDEO.md` | Instructions pour capturer l'image de la vidéo hero |

---

## ✨ Nouveautés v2.1

### ✅ Menu Burger ajouté
Chaque screen possède maintenant un **menu burger** (3 barres horizontales) en haut à droite :
- Position : `x=1340, y=30`
- Couleur : Blanc (`#ffffff`)
- Pour le design responsive

### ✅ Footer complet avec gradient 30/70
Tous les screens ont maintenant un **footer identique au site** :
- **Dégradé** : `#4CAF50` (30%) → `#2196F3` (70%)
- **Hauteur** : 100px
- **Contenu** :
  - Copyright © 2025 EcoRide
  - Liens : Mentions légales, Politique de confidentialité, Contact
  - Icônes sociales (Facebook, LinkedIn)
  - Baseline : "Plateforme de covoiturage écologique"

### ✅ Placeholder vidéo amélioré
Le screen `01-page-accueil.svg` a un **indicateur clair** pour remplacer le rectangle noir par l'image vidéo.
👉 Consulte `GUIDE-CAPTURE-VIDEO.md` pour les instructions complètes.

---

## 🎨 Design System Respecté

### Couleurs utilisées (de votre site)
- **Vert principal:** `#27ae60` / `#4CAF50` (header/footer)
- **Bleu secondaire:** `#3498db` / `#2196F3` (header/footer)
- **Texte principal:** `#343a40`
- **Texte secondaire:** `#6c757d`
- **Background:** `#f8f9fa`
- **Bordures:** `#e0e0e0`

### Typographies
- **Titres:** Poppins (Bold 700, SemiBold 600)
- **Texte:** Roboto (Regular 400, Medium 500, Bold 700)

### Header/Footer
- **Header:** Dégradé horizontal `#4CAF50` (30%) → `#2196F3` (70%)`
- **Footer:** Dégradé horizontal `#4CAF50` (30%) → `#2196F3` (70%)` (IDENTIQUE)
- **Height:** 80px (header), 100px (footer)
- **Logo:** Cercle blanc + texte "EcoRide" + Menu burger
- **Navigation:** Liens desktop + menu burger responsive

---

## 📥 Import dans Figma

### Méthode recommandée : Glisser-déposer

1. **Ouvrir Figma** (Desktop de préférence)
2. **Créer un nouveau fichier** : "EcoRide - Maquettes Exam"
3. **Glisser-déposer** les 5 fichiers SVG dans Figma
4. Les screens s'importeront comme objets vectoriels

### Organisation recommandée

```
📁 EcoRide - Maquettes Exam
├── 📄 Page 1: Accueil
│   └── 01-page-accueil.svg
├── 📄 Page 2: Recherche
│   └── 02-recherche-covoiturages.svg
├── 📄 Page 3: Détails Trajet
│   └── 03-details-covoiturage.svg
├── 📄 Page 4: Proposer Trajet
│   └── 04-proposer-covoiturage.svg
└── 📄 Page 5: Mon Espace
    └── 05-mon-espace.svg
```

---

## ✏️ Personnalisation dans Figma

### Ce que vous POUVEZ modifier facilement

✅ **Textes** : Double-cliquez sur n'importe quel texte  
✅ **Couleurs** : Sélectionnez un élément → changez la couleur  
✅ **Tailles** : Redimensionnez les éléments (gardez les proportions)  
✅ **Ajout d'images** : Remplacez les placeholders par vos vraies photos  

### Remplacer le logo

Le logo actuel est un **cercle blanc** (placeholder). Pour le remplacer :

1. **Préparez votre logo** : `public/images/logo.png`
2. Dans Figma : **File → Place image**
3. Sélectionnez `logo.png`
4. Placez-le à la position du cercle blanc
5. Redimensionnez à ~48x48px
6. Supprimez le cercle placeholder

---

## 🎯 Workflow Examen ECF

### Phase 1 : Import (15 min)
1. ✅ Créer fichier Figma
2. ✅ Importer les 5 SVG
3. ✅ Créer une page par screen
4. ✅ Vérifier que tout s'affiche bien

### Phase 2 : Personnalisation (1h)
1. ✅ Remplacer le logo par le vrai
2. ✅ Ajuster les textes si nécessaire
3. ✅ Remplacer les photos placeholder par vraies images
4. ✅ Vérifier la cohérence des couleurs

### Phase 3 : Prototypage (30 min)
1. ✅ Lier les écrans entre eux (mode Prototype)
2. ✅ Ajouter les interactions :
   - Accueil → "Rechercher un trajet" → Page Recherche
   - Recherche → Click sur un trajet → Détails
   - Détails → "Réserver" → Confirmation
   - Header → "Proposer un trajet" → Formulaire
   - Header → "Mon Espace" → Dashboard
3. ✅ Tester le flow complet

### Phase 4 : Présentation (10 min)
1. ✅ Mode présentation (Play button)
2. ✅ Tester le parcours utilisateur complet
3. ✅ Préparer les explications pour le jury

**Total estimé : 2h pour un prototype complet prêt pour l'examen** ✅

---

## 📊 Correspondance avec vos pages HTML

| Screen Figma | Fichier HTML | Éléments principaux |
|--------------|--------------|---------------------|
| **01-page-accueil** | `index.html` | Hero vidéo, "Qui sommes-nous?", Avantages, Paiements sécurisés |
| **02-recherche-covoiturages** | `covoiturages.html` | Formulaire recherche, Filtres (prix, durée, note), Liste résultats |
| **03-details-covoiturage** | `details-covoiturage.html` | Infos trajet, Conducteur, Véhicule, Avis, Sidebar réservation |
| **04-proposer-covoiturage** | `proposer-covoiturage.html` | Formulaire multi-sections (Itinéraire, Date, Véhicule, Prix) |
| **05-mon-espace** | `espace-utilisateur.html` | Profil, Crédits, Tabs (Véhicules, Trajets proposés, Réservations) |

---

## 🎨 Détails des Screens

### Screen 1 : Page d'Accueil
**Sections :**
- Header sticky avec dégradé vert/bleu
- Hero avec vidéo background + overlay + CTA "Rechercher un trajet"
- Section "Qui sommes-nous ?" avec texte + 2 images
- Section "Pourquoi choisir EcoRide ?" avec 3 cartes (Économique, Écologique, Sécurité)
- Section Paiements sécurisés (optionnelle dans le SVG, à ajouter si besoin)

### Screen 2 : Recherche Covoiturages
**Sections :**
- Hero vert avec formulaire de recherche (4 champs + bouton)
- Sidebar gauche : Filtres (écologique, prix max, durée max, note min)
- Zone principale : 3 cartes de résultats de trajets
- Chaque carte : Photo conducteur, Itinéraire, Date/heure, Places, Note, Prix

### Screen 3 : Détails Covoiturage
**Sections :**
- Container principal avec 2 colonnes
- Colonne gauche : Résumé trajet, Infos conducteur, Véhicule, Avis
- Colonne droite (sidebar) : Réservation (Prix, Nombre places, Total, Bouton "Réserver")
- Éléments visuels : Icônes (calendrier, horloge, euro, places), Badge écologique

### Screen 4 : Proposer Covoiturage
**Sections :**
- Formulaire en 4 parties :
  1. 📍 Itinéraire (départ, arrivée)
  2. 📅 Date et Heure
  3. 🚗 Véhicule et Places (sélection véhicule, nombre places)
  4. 💰 Prix et Options (prix, checkbox écologique, description)
- Boutons : Annuler (blanc) + Publier (vert)

### Screen 5 : Mon Espace
**Sections :**
- Header vert avec "Bienvenue, Cyril !" + Affichage crédits
- Sidebar gauche : Photo profil + Nom + Email
- Zone principale :
  - Tabs : Mes Véhicules (actif) | Trajets Proposés | Mes Réservations
  - Liste véhicules (2 cartes) avec bouton "Supprimer"
  - Section "Trajets à venir" avec 1 trajet
  - 3 stats en bas : Trajets effectués, CO₂ économisé, Économies réalisées

---

## ✅ Checklist Avant Examen

### Import et Setup
- [ ] Fichier Figma créé : "EcoRide - Maquettes Exam"
- [ ] 5 SVG importés dans 5 pages différentes
- [ ] Logo remplacé par le vrai logo.png
- [ ] Vérification : toutes les pages s'affichent correctement

### Personnalisation
- [ ] Textes ajustés si nécessaire
- [ ] Photos placeholder remplacées par vraies images
- [ ] Couleurs vérifiées (cohérence avec charte)

### Prototypage
- [ ] Liens créés entre les pages
- [ ] Interactions ajoutées sur les boutons
- [ ] Flow testé : Accueil → Recherche → Détails → Réservation
- [ ] Flow testé : Proposer trajet, Mon Espace

### Présentation
- [ ] Mode présentation testé
- [ ] Scénario de démonstration préparé
- [ ] Explications techniques prêtes (Docker, CRUD, sécurité)

---

## 🆘 Problèmes Fréquents

### Q: Les SVG ne s'affichent pas correctement
**R:** Utilisez Figma Desktop (pas la version web). Si le problème persiste, ouvrez le SVG dans VS Code, copiez tout le code, et collez dans Figma.

### Q: Le texte est flou
**R:** C'est normal pour un SVG importé. Si vous voulez modifier le texte, détachez le SVG (Ungroup) et recréez les textes avec des text boxes Figma.

### Q: Je veux changer le logo
**R:** Importez votre logo.png via File → Place image, et positionnez-le sur le cercle blanc. Redimensionnez à ~48x48px.

### Q: Les couleurs ne correspondent pas exactement
**R:** Les SVG utilisent les couleurs de votre CSS actuel. Si vous voulez les ajuster, sélectionnez les éléments et changez les couleurs dans le panneau de droite.

### Q: Je n'ai pas assez de temps pour tout faire
**R:** Concentrez-vous sur les **3 écrans essentiels** :
1. Page d'accueil
2. Recherche covoiturages
3. Détails covoiturage

Ces 3 screens + un prototype simple = suffisant pour l'examen.

---

## 📚 Ressources

- **Charte Graphique:** `document/Charte-Graphique-EcoRide-2025.md`
- **Documentation Technique:** `document/Documentation-Technique-EcoRide-2025.md`
- **Guide Figma officiel:** https://help.figma.com/
- **Présentation Examen:** `document/PRESENTATION-EXAMEN-ECORIDE-35MIN.md`

---

## 🎯 Objectif Final

**Avoir un prototype Figma interactif qui démontre :**
✅ La navigation complète du site  
✅ Le design cohérent avec la charte graphique  
✅ Les fonctionnalités principales (rechercher, réserver, proposer, gérer)  
✅ Une expérience utilisateur fluide  

**Ce prototype servira de support visuel pour l'examen ECF et démontrera votre maîtrise du design d'interface.**

---

**Bon travail sur Figma ! 🚀**

Pour toute question : consultez la documentation ou testez directement dans Figma.
