# 💬 Bulles de Chat - Guide d'Utilisation

## 📦 Fichiers créés

### ✅ 4 composants SVG de chat

| Fichier | Description | Dimensions | Usage |
|---------|-------------|------------|-------|
| `bubble-chat.svg` | **Interface complète** de chat | 400x500 | Affichage complet avec header, messages, input |
| `bubble-chat-simple-received.svg` | **Bulle message reçu** (conducteur) | 350x120 | Message entrant avec avatar |
| `bubble-chat-simple-sent.svg` | **Bulle message envoyé** (utilisateur) | 350x100 | Message sortant aligné à droite |
| `bubble-chat-typing.svg` | **Indicateur "en train d'écrire"** | 180x60 | Animation 3 points |

---

## 🎨 Styles des bulles

### 📥 **Message reçu** (Conducteur)
- **Couleur bulle :** `#f1f3f4` (gris clair)
- **Couleur texte :** `#343a40` (noir)
- **Nom conducteur :** `#27ae60` (vert)
- **Position :** Aligné à gauche
- **Avatar :** Cercle gris avec initiale

### 📤 **Message envoyé** (Utilisateur)
- **Couleur bulle :** `#27ae60` (vert EcoRide)
- **Couleur texte :** `#ffffff` (blanc)
- **Position :** Aligné à droite
- **Avatar :** Cercle bleu avec initiale (optionnel)

### ⏳ **En train d'écrire**
- **Bulle :** `#f1f3f4` (gris clair)
- **Points animés :** `#9ca3af` avec animation opacité
- **Animation :** 1.5s, infinie, décalage 0.3s entre chaque point

---

## 📥 Utilisation dans Figma

### **Option 1 : Interface complète** (`bubble-chat.svg`)

**Quand l'utiliser :**
- Maquette de messagerie entre conducteur et passager
- Prototype d'échange de messages
- Démonstration de la fonctionnalité chat

**Comment l'insérer :**
1. Importe `bubble-chat.svg` dans Figma
2. Place-le dans ton screen (ex: `03-details-covoiturage.svg`)
3. Positionne à côté des infos du trajet
4. Redimensionne si besoin (garder les proportions)

**Éléments inclus :**
- ✅ Header avec gradient EcoRide (30/70)
- ✅ Photo et nom du conducteur
- ✅ 3 messages d'exemple (2 reçus, 1 envoyé)
- ✅ Indicateur "en train d'écrire"
- ✅ Zone de saisie avec emojis, pièce jointe, envoi

---

### **Option 2 : Bulles simples** (pour conversations plus longues)

**Quand les utiliser :**
- Créer une conversation réaliste avec plusieurs échanges
- Personnaliser les messages
- Assembler ta propre interface

**Comment faire :**
1. Importe `bubble-chat-simple-received.svg` et `bubble-chat-simple-sent.svg`
2. Duplique les bulles dans Figma
3. Modifie les textes directement dans Figma
4. Alterne messages reçus (gauche) et envoyés (droite)
5. Ajoute `bubble-chat-typing.svg` à la fin

**Exemple de conversation :**
```
[Reçu]  Bonjour ! Merci d'avoir réservé 😊
[Reçu]  RDV devant la gare à 10h00 demain.
[Envoyé] Parfait, je serai là à l'heure !
[Envoyé] À demain 👋
[Reçu]  Super ! À demain 😊
[Typing] ... (en train d'écrire)
```

---

## 🎨 Personnalisation dans Figma

### **Modifier les textes**
1. Double-clic sur le texte dans Figma
2. Tape ton nouveau message
3. Ajuste la taille de la bulle si nécessaire

### **Changer les avatars**
1. Sélectionne le cercle avatar
2. Remplace par une vraie photo (drag & drop)
3. Applique un masque circulaire

### **Adapter les couleurs**
- **Messages reçus :** Garde `#f1f3f4` (standard messagerie)
- **Messages envoyés :** Utilise `#27ae60` (vert EcoRide) ou `#2196F3` (bleu)

### **Ajouter des emojis**
- Copie-colle directement depuis Windows : `Win + .`
- Ou utilise des emojis depuis Figma plugins

---

## 💡 Cas d'usage dans tes maquettes

### **1. Page Détails Covoiturage** (`03-details-covoiturage.svg`)

**Ajouter un bouton "Contacter":**
```
┌────────────────────────────────────┐
│ Nancy → Lyon                       │
│ Samedi 26 Oct • 10:00             │
│                                    │
│ 👤 Marie D. ⭐ 4.8                │
│ [Contacter le conducteur] 💬      │ ← Nouveau bouton
└────────────────────────────────────┘
```

**Ou intégrer directement le chat :**
- Place `bubble-chat.svg` dans un onglet "Messages"
- Crée un modal/popup avec le chat

---

### **2. Nouvelle page "Messagerie"** (optionnel)

**Créer un écran dédié :**
1. Copie `01-page-accueil.svg` comme base
2. Supprime le contenu principal
3. Insère `bubble-chat.svg` au centre
4. Ajoute une liste de conversations à gauche (optionnel)

**Structure :**
```
┌─────────────────────────────────────┐
│ Header EcoRide (gradient 30/70)    │
├────────────┬────────────────────────┤
│ Contacts   │  Chat avec Marie D.   │
│            │                        │
│ 🟢 Marie D.│  [Interface complète]  │
│ 🔴 Paul M. │  [bubble-chat.svg]     │
│ 🟢 Sophie  │                        │
└────────────┴────────────────────────┘
```

---

### **3. Prototype interactif**

**Créer un flow :**
1. **Page Détails** → Bouton "Contacter" → **Page Messagerie**
2. **Page Messagerie** → Bouton "Retour" → **Page Détails**

**Animation :**
- Type : `Smart Animate` (pour transition fluide)
- Durée : 300ms
- Direction : Slide from right

---

## ✨ Fonctionnalités incluses

### **Interface complète** (`bubble-chat.svg`)
- ✅ Header avec photo + nom + statut "En ligne"
- ✅ Icône chat (💬)
- ✅ Messages avec horodatage (10:23, 10:25, etc.)
- ✅ Avatar sur chaque message
- ✅ Indicateur "en train d'écrire" animé
- ✅ Barre de saisie avec :
  - Bouton emoji (😊)
  - Champ texte "Écrire un message..."
  - Bouton pièce jointe (📎)
  - Bouton envoyer (➤) en vert

### **Détails techniques**
- **Check "vu" :** ✓✓ (bleu = lu, gris = envoyé)
- **Horodatage :** Format 10:23 (HH:MM)
- **Border-radius :** 12px (bulles), 16px (messages)
- **Animations :** 3 points avec opacité (CSS animation compatible Figma)

---

## 🎯 Checklist d'intégration

- [ ] Importer les fichiers SVG dans Figma
- [ ] Choisir le type de bulle (complète ou simple)
- [ ] Placer dans la maquette appropriée
- [ ] Remplacer les avatars par de vraies photos
- [ ] Personnaliser les messages
- [ ] Ajouter le bouton "Contacter" dans les détails du trajet
- [ ] (Optionnel) Créer une page "Messagerie" dédiée
- [ ] Tester le prototype avec transitions

---

## 📌 Conseils pour l'examen ECF

### **Points forts à présenter :**
- ✅ **Communication facilitée** entre conducteur et passager
- ✅ **Sécurité renforcée** : messages avant le trajet
- ✅ **Expérience utilisateur** : interface familière (type WhatsApp)
- ✅ **Design cohérent** : gradient EcoRide dans le header

### **Scénario à démontrer :**
1. Utilisateur réserve un trajet
2. Clique sur "Contacter le conducteur"
3. Interface de chat s'ouvre
4. Échange de messages pour confirmer RDV
5. Indicateur "en train d'écrire" montre l'interaction en temps réel

---

## 🚀 Prêt à utiliser !

**Fichiers disponibles :**
- ✅ `bubble-chat.svg` (400x500)
- ✅ `bubble-chat-simple-received.svg` (350x120)
- ✅ `bubble-chat-simple-sent.svg` (350x100)
- ✅ `bubble-chat-typing.svg` (180x60)

**Emplacement :** `document/figma-assets/`

**Temps d'intégration estimé :** 15-30 minutes

---

**Bon prototypage ! 💬✨**
