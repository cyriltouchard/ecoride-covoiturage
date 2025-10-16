# 📹 Guide : Capturer une image de la vidéo

## Problème
Le fichier `01-page-accueil.svg` a besoin d'une image de la vidéo `covoiturage.mp4` pour remplacer le placeholder noir dans la section hero.

---

## ✅ Solution 1 : Capture manuelle (Rapide - 2 minutes)

### Étapes :
1. **Ouvre la vidéo** dans ton navigateur ou VLC :
   ```
   C:/Users/cyril/OneDrive/Bureau/examen/public/videos/covoiturage.mp4
   ```

2. **Avance à 3-5 secondes** (pour avoir une belle image)

3. **Mets en pause** et **prends une capture d'écran** :
   - Windows : `Windows + Shift + S`
   - Ou clic droit → Capturer l'image (dans VLC)

4. **Enregistre l'image** sous :
   ```
   C:/Users/cyril/OneDrive/Bureau/examen/public/images/video-capture.jpg
   ```

5. **Dimensions recommandées** : 1440x400 pixels (pour remplir le hero)

---

## ✅ Solution 2 : Capture avec VLC Media Player

### Étapes :
1. Ouvre la vidéo dans **VLC**
2. Va au menu **Vidéo** → **Prendre une capture d'écran**
3. VLC va sauvegarder l'image dans `C:\Users\cyril\Pictures\`
4. Renomme-la en `video-capture.jpg` et déplace-la vers :
   ```
   C:/Users/cyril/OneDrive/Bureau/examen/public/images/
   ```

---

## ✅ Solution 3 : Capture avec les outils de développement du navigateur

### Étapes :
1. Ouvre `index.html` dans ton navigateur
2. **Appuie sur F12** (outils de développement)
3. Va dans l'onglet **Console**
4. Tape ce code :
   ```javascript
   const video = document.querySelector('video');
   video.currentTime = 3; // Avance à 3 secondes
   video.pause();
   
   const canvas = document.createElement('canvas');
   canvas.width = 1440;
   canvas.height = 400;
   const ctx = canvas.getContext('2d');
   ctx.drawImage(video, 0, 0, 1440, 400);
   
   canvas.toBlob((blob) => {
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'video-capture.jpg';
     a.click();
   }, 'image/jpeg');
   ```

5. L'image se téléchargera automatiquement dans ton dossier **Téléchargements**
6. Déplace-la vers `public/images/`

---

## 📂 Utilisation dans Figma

Une fois que tu as `video-capture.jpg` :

1. **Importe** `01-page-accueil.svg` dans Figma
2. **Sélectionne** le rectangle noir du hero (0, 80, 1440x400)
3. **Remplace-le** par ton image `video-capture.jpg` :
   - Drag & drop l'image dans Figma
   - Place-la exactement à `x=0, y=80`
   - Redimensionne à `1440x400`
4. **Ajoute l'overlay** par-dessus :
   - Rectangle noir avec opacité 40% (`rgba(0,0,0,0.4)`)

---

## ✨ Résultat final

Tu auras un hero avec :
- ✅ Image vidéo en arrière-plan
- ✅ Overlay sombre (40% opacité)
- ✅ Texte blanc bien visible par-dessus
- ✅ Bouton CTA "Rechercher un trajet"

---

## 📌 Note importante

L'image `video-capture.jpg` doit être dans le dossier `public/images/` pour :
- Être utilisée dans Figma
- Être référencée dans le HTML si besoin
- Être versionnée sur GitHub avec les autres assets
