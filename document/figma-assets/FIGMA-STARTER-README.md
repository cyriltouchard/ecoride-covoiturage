# 🎨 EcoRide - Pack Figma Starter

**Date:** 15 octobre 2025  
**Version:** 1.0  
**Auteur:** Équipe EcoRide

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Contenu du pack](#contenu-du-pack)
3. [Import dans Figma](#import-dans-figma)
4. [Palette de couleurs](#palette-de-couleurs)
5. [Typographie](#typographie)
6. [Composants](#composants)
7. [Templates d'écrans](#templates-décrans)
8. [Workflow recommandé](#workflow-recommandé)
9. [Bonnes pratiques](#bonnes-pratiques)

---

## 🎯 Vue d'ensemble

Ce pack contient tous les assets nécessaires pour créer les maquettes haute-fidélité d'EcoRide dans Figma. Tous les fichiers sont au format SVG vectoriel, optimisés pour l'import et l'édition dans Figma.

**Objectif:** Permettre une création rapide et cohérente des interfaces EcoRide en respectant le design system établi.

---

## 📦 Contenu du pack

### Assets de base
```
document/figma-assets/
├── logo-ecoride.svg              # Logo principal
├── colors-typography.svg         # Design system complet
├── navbar.svg                    # Barre de navigation
└── FIGMA-STARTER-README.md       # Ce fichier
```

### Composants UI
```
├── button-primary.svg            # Bouton principal (gradient)
├── button-secondary.svg          # Bouton secondaire (outline)
├── input-field.svg               # Champ de saisie
├── card-ride.svg                 # Carte trajet
```

### Icônes
```
├── icon-home.svg                 # Accueil
├── icon-search.svg               # Recherche
├── icon-user.svg                 # Profil utilisateur
├── icon-car.svg                  # Véhicule
├── icon-plus.svg                 # Ajouter
├── icon-calendar.svg             # Calendrier
```

### Templates d'écrans (1440x900)
```
├── screen-home.svg               # Page d'accueil
├── screen-search-results.svg     # Résultats de recherche
├── screen-ride-details.svg       # Détails d'un trajet
├── screen-create-ride.svg        # Création de trajet
├── screen-user-profile.svg       # Profil utilisateur
```

---

## 📥 Import dans Figma

### Méthode 1 : Glisser-déposer (Recommandé)
1. Ouvrez Figma et créez un nouveau fichier (ou ouvrez un fichier existant)
2. Glissez-déposez les fichiers SVG depuis votre explorateur directement dans Figma
3. Les SVG seront importés en tant qu'objets vectoriels modifiables

### Méthode 2 : Menu File
1. Dans Figma, cliquez sur **File** → **Place image**
2. Sélectionnez un ou plusieurs fichiers SVG
3. Cliquez sur votre canvas pour placer l'image

### Méthode 3 : Copier-coller le code SVG
1. Ouvrez le fichier SVG dans un éditeur de texte (VS Code, Notepad++)
2. Copiez tout le contenu du fichier
3. Dans Figma, sélectionnez un frame
4. Collez (Ctrl+V / Cmd+V)
5. Figma convertira automatiquement le SVG en objets vectoriels

> **💡 Astuce:** La méthode 3 offre la meilleure qualité d'édition car elle préserve toutes les propriétés vectorielles et les couches.

---

## 🎨 Palette de couleurs

### Couleurs principales

| Nom | Hex | Usage | Variable Figma |
|-----|-----|-------|----------------|
| **Primary** | `#2e8b57` | Boutons principaux, éléments interactifs | `color/primary` |
| **Secondary** | `#4682b4` | Accents, dégradés | `color/secondary` |
| **Success** | `#1f8a5b` | Prix, confirmations, états positifs | `color/success` |
| **Danger** | `#e74c3c` | Erreurs, suppression, alertes | `color/danger` |

### Couleurs neutres

| Nom | Hex | Usage | Variable Figma |
|-----|-----|-------|----------------|
| **Dark** | `#223344` | Titres, textes principaux | `color/text-primary` |
| **Gray** | `#536277` | Textes secondaires | `color/text-secondary` |
| **Light Gray** | `#9aa4b2` | Placeholders, labels | `color/text-muted` |
| **Border** | `#e6e9ee` | Bordures, séparateurs | `color/border` |
| **Background** | `#f8f9fa` | Fond de page, cartes | `color/background` |
| **White** | `#ffffff` | Cartes, modales, conteneurs | `color/white` |

### Création des styles dans Figma

1. Ouvrez le panneau **Styles** (icône palette dans la barre d'outils)
2. Cliquez sur le `+` à côté de **Color styles**
3. Créez un style pour chaque couleur avec le nom correspondant
4. Organisez-les en dossiers : `Colors/Primary`, `Colors/Text`, etc.

---

## 🔤 Typographie

### Police principale
**Poppins** (Google Fonts)  
Fallback: Arial, sans-serif

### Installation de la police
1. Téléchargez Poppins sur [Google Fonts](https://fonts.google.com/specimen/Poppins)
2. Installez les variantes : Regular (400), SemiBold (600), Bold (700)
3. Redémarrez Figma pour utiliser la police

### Styles de texte

| Style | Taille | Poids | Line Height | Usage |
|-------|--------|-------|-------------|-------|
| **H1** | 42px | Bold (700) | 120% | Titres principaux |
| **H2** | 32px | Bold (700) | 120% | Titres de sections |
| **H3** | 24px | SemiBold (600) | 130% | Sous-titres |
| **Subtitle** | 18px | SemiBold (600) | 140% | Éléments importants |
| **Body** | 16px | Regular (400) | 150% | Texte principal |
| **Body Small** | 14px | Regular (400) | 150% | Texte secondaire |
| **Caption** | 12px | Regular (400) | 140% | Légendes, notes |

### Création des styles de texte dans Figma

1. Créez un bloc de texte
2. Appliquez la police, taille et poids
3. Ouvrez le panneau **Text styles** (T avec flèche)
4. Cliquez sur le `+` pour créer un nouveau style
5. Nommez selon la convention : `Typography/H1`, `Typography/Body`, etc.

---

## 🧩 Composants

### Création de composants réutilisables

#### 1. Boutons

**Bouton primaire** (`button-primary.svg`)
- Variantes : Default, Hover, Active, Disabled
- Taille : 220x56px (large), 180x48px (medium), 140x40px (small)
- Border radius : 12px
- Gradient : `#2e8b57` → `#4682b4`

**Bouton secondaire** (`button-secondary.svg`)
- Border : 2px solid `#2e8b57`
- Background : `#ffffff`
- Text color : `#2e8b57`

**Création dans Figma:**
```
1. Importez button-primary.svg
2. Sélectionnez le groupe
3. Cliquez droit → Create component (Ctrl+Alt+K)
4. Nommez: Components/Button/Primary
5. Créez les variantes (Add variant)
   - State: default, hover, active, disabled
   - Size: small, medium, large
```

#### 2. Champs de saisie

**Input field** (`input-field.svg`)
- Taille : 360x56px
- Border radius : 10px
- Border : 1px solid `#e6e9ee`
- Background : `#ffffff`
- Placeholder color : `#9aa4b2`

**États:**
- Default
- Focus (border: `#2e8b57`)
- Error (border: `#e74c3c`)
- Disabled (background: `#f8f9fa`)

#### 3. Cartes

**Card Ride** (`card-ride.svg`)
- Taille : 520x140px
- Border radius : 10px
- Shadow : 0px 2px 8px rgba(0,0,0,0.08)
- Padding : 16px
- Gap entre éléments : 16px

---

## 📱 Templates d'écrans

### 1. Page d'accueil (`screen-home.svg`)
**Sections incluses:**
- Hero avec formulaire de recherche
- Section "Pourquoi EcoRide" (3 cards)
- Call-to-action

**Utilisation:**
- Importer le template complet
- Détacher les composants (Ungroup)
- Créer des composants Figma à partir des sections
- Auto Layout pour responsive

### 2. Résultats de recherche (`screen-search-results.svg`)
**Sections incluses:**
- Filtres de recherche
- Liste de résultats (cards trajets)
- Pagination

### 3. Détails trajet (`screen-ride-details.svg`)
**Sections incluses:**
- Informations trajet (départ/arrivée)
- Profil conducteur
- Infos véhicule
- Sidebar réservation
- Section avis

### 4. Création de trajet (`screen-create-ride.svg`)
**Sections incluses:**
- Stepper (indicateur d'étapes)
- Formulaire multi-étapes
- Boutons navigation

### 5. Profil utilisateur (`screen-user-profile.svg`)
**Sections incluses:**
- Header profil avec stats
- Tabs navigation
- Liste de trajets (à venir / passés)

---

## 🔄 Workflow recommandé

### Phase 1 : Setup (30 min)
1. ✅ Créer un nouveau fichier Figma "EcoRide - Maquettes"
2. ✅ Créer une page "Design System"
3. ✅ Importer `colors-typography.svg`
4. ✅ Créer les Color Styles
5. ✅ Créer les Text Styles
6. ✅ Créer une page "Components"
7. ✅ Importer tous les composants SVG
8. ✅ Créer les composants Figma avec variantes

### Phase 2 : Templates (1h)
1. ✅ Créer une page "Screens"
2. ✅ Importer les 5 templates d'écrans
3. ✅ Créer un frame 1440x900 pour chaque écran
4. ✅ Organiser avec Auto Layout
5. ✅ Remplacer les éléments par vos composants

### Phase 3 : Personnalisation (2h)
1. ✅ Adapter le contenu (textes, images)
2. ✅ Ajouter les interactions (prototype)
3. ✅ Créer les variantes responsive (mobile, tablette)
4. ✅ Ajouter les états (hover, active, error)

### Phase 4 : Prototypage (1h)
1. ✅ Lier les écrans entre eux
2. ✅ Ajouter les transitions
3. ✅ Créer un flow utilisateur complet
4. ✅ Tester le prototype

---

## ✅ Bonnes pratiques

### Organisation
- **Pages:** Design System / Components / Screens / Prototype
- **Frames:** Nommer clairement (ex: "Home - Desktop 1440")
- **Composants:** Hiérarchie claire (`Components/Button/Primary`)

### Auto Layout
- Utiliser Auto Layout pour tous les conteneurs
- Définir des spacing constants (8px, 16px, 24px, 32px)
- Créer des composants flexibles avec Auto Layout

### Composants
- Créer des variantes pour tous les états
- Utiliser les propriétés de composants (texte, couleur)
- Documenter les composants (ajouter descriptions)

### Couleurs et styles
- **Toujours** utiliser les Color Styles (jamais de hex en dur)
- **Toujours** utiliser les Text Styles
- Créer des effets (ombres, flous) réutilisables

### Nommage
- **Frames:** `Nom de la page - Device - État`
  - Exemple: `Home - Desktop - Default`
- **Composants:** `Category/Type/Variant`
  - Exemple: `Components/Button/Primary`
- **Styles:** `Category/Name`
  - Exemple: `Colors/Primary`, `Typography/H1`

### Performance
- Regrouper les objets similaires
- Utiliser des instances de composants (pas de duplication)
- Optimiser les images (compression)

---

## 🚀 Pour aller plus loin

### Créer des écrans supplémentaires
- **Admin dashboard** (gestion des trajets)
- **Espace employé** (modération)
- **Page mentions légales**
- **Modal de paiement**
- **Notifications**

### Responsive design
1. Dupliquer un frame Desktop
2. Redimensionner à 768px (tablette) ou 375px (mobile)
3. Ajuster les composants avec Auto Layout
4. Créer des variantes responsive des composants

### Prototypage avancé
- Ajouter des micro-interactions
- Créer des animations (Smart Animate)
- Tester avec des utilisateurs
- Exporter pour développement (specs CSS)

---

## 📚 Ressources

### Figma
- [Documentation officielle Figma](https://help.figma.com/)
- [Figma Best Practices](https://www.figma.com/best-practices/)
- [Auto Layout Guide](https://help.figma.com/hc/en-us/articles/360040451373)

### Design System
- [Material Design](https://material.io/design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/)
- [Design System Checklist](https://designsystemchecklist.com/)

### Inspiration
- [Dribbble - Covoiturage](https://dribbble.com/search/carpool)
- [Behance - Transport Apps](https://www.behance.net/search/projects?search=transport%20app)
- [Mobbin - App Inspiration](https://mobbin.com/)

---

## 🆘 Aide et support

### Problèmes d'import
**Q: Les SVG ne s'importent pas correctement**  
R: Vérifiez que vous utilisez Figma Desktop (pas la version web). Essayez la méthode copier-coller du code SVG.

**Q: Les polices ne s'affichent pas**  
R: Installez Poppins localement et redémarrez Figma.

**Q: Les couleurs sont différentes**  
R: Les SVG utilisent des valeurs hex exactes. Créez les Color Styles avec les hex fournis dans ce guide.

### Contact
Pour toute question sur le design system EcoRide:
- **Email:** design@ecoride.fr
- **Documentation:** `document/Chartre Graphique.pdf`
- **Repo GitHub:** [ecoride-covoiturage](https://github.com/cyriltouchard/ecoride-covoiturage)

---

**Bon travail sur Figma ! 🎨✨**
