# 📲 ACI France – Application PWA

## Ce dossier contient
```
pwa-aci/
├── index.html      ← L'application principale
├── manifest.json   ← Déclaration PWA (nom, icônes, couleurs)
├── sw.js           ← Service Worker (cache hors-ligne)
└── icons/          ← Icônes pour Android, iOS, bureau
```

## Comment mettre en ligne (obligatoire pour l'installation)

La PWA doit être servie via **HTTPS**. 3 options gratuites :

### Option A – GitHub Pages (recommandé, gratuit)
1. Créer un compte sur github.com
2. Nouveau dépôt → glisser-déposer tous les fichiers
3. Settings → Pages → Branch: main → Save
4. L'URL sera : `https://votre-pseudo.github.io/aci-france/`

### Option B – Netlify Drop (le plus simple, gratuit)
1. Aller sur **netlify.com/drop**
2. Glisser-déposer le dossier `pwa-aci`
3. Une URL HTTPS est générée instantanément

### Option C – Serveur interne CGT
Si vous avez un serveur web, déposer le dossier et s'assurer que HTTPS est activé.

---

## Comment installer l'app sur un téléphone

### Android (Chrome)
1. Ouvrir l'URL dans Chrome
2. La bannière "Installer" apparaît en bas → toucher **Installer**
3. Ou : menu ⋮ → "Ajouter à l'écran d'accueil"

### iPhone / iPad (Safari uniquement)
1. Ouvrir l'URL dans **Safari** (pas Chrome)
2. Toucher le bouton Partager 
3. "Sur l'écran d'accueil" → Ajouter

### PC / Mac (Chrome ou Edge)
1. Ouvrir l'URL
2. Icône ⊕ dans la barre d'adresse → Installer
3. Ou : menu → "Installer ACI France"

---

## Fonctionnement hors-ligne
Après la première ouverture, **l'app fonctionne entièrement sans internet**.
Les données sont mises en cache automatiquement.

## Mise à jour
Quand vous mettez à jour `index.html` sur le serveur,
un toast apparaît dans l'app → "Recharger" pour appliquer.
