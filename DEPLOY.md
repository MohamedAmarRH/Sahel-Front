# 🚀 Guide de Déploiement - Yaourt du Sahel

Ce guide explique comment déployer le backend Node.js + Supabase et mettre à jour le frontend.

---

## 📋 Étape 1: Configurer Supabase (Base de données)

### 1.1 Créer un compte Supabase
1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Cliquez sur "New Project"
4. Nommez votre projet (ex: "yaourt-du-sahel")
5. Choisissez une région (de préférence proche de vous)
6. Attendez la création du projet

### 1.2 Créer les tables
1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Cliquez sur **New query**
3. Copiez-collez le contenu du fichier `backend/database.sql`
4. Cliquez sur **Run**

### 1.3 Récupérer les credentials
1. Allez dans **Project Settings** > **API**
2. Copiez :
   - `URL` (ex: `https://xxxxx.supabase.co`)
   - `anon public` (la clé publique)

---

## 📋 Étape 2: Déployer le Backend

### Option A: Railway (Recommandé - Gratuit)

1. Créez un compte sur [https://railway.app](https://railway.app)
2. Cliquez sur **New Project** > **Deploy from GitHub repo**
3. Connectez votre compte GitHub et uploadez le dossier `backend`
4. Ou utilisez **Deploy from template** > **Empty project**
5. Cliquez sur **Add a service** > **GitHub Repo**
6. Sélectionnez votre repo
7. Ajoutez les variables d'environnement :
   - `SUPABASE_URL` = votre URL Supabase
   - `SUPABASE_ANON_KEY` = votre clé anon
   - `PORT` = 3000
8. Cliquez sur **Deploy**
9. Copiez l'URL de déploiement (ex: `https://yaourt-api.up.railway.app`)

### Option B: Render (Gratuit)

1. Créez un compte sur [https://render.com](https://render.com)
2. Cliquez sur **New** > **Web Service**
3. Connectez votre GitHub et sélectionnez le repo
4. Configurez :
   - **Name**: yaourt-du-sahel-api
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Ajoutez les variables d'environnement :
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Cliquez sur **Create Web Service**
7. Copiez l'URL (ex: `https://yaourt-api.onrender.com`)

### Option C: Heroku

```bash
# Installer Heroku CLI
heroku login
heroku create yaourt-du-sahel-api

# Définir les variables d'environnement
heroku config:set SUPABASE_URL=https://votre-projet.supabase.co
heroku config:set SUPABASE_ANON_KEY=votre-cle-anon

# Déployer
cd backend
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

---

## 📋 Étape 3: Mettre à jour le Frontend

### 3.1 Modifier la configuration API

Ouvrez `app/src/config.ts` et remplacez :

```typescript
// AVANT (local)
export const API_URL = 'http://localhost:3000';

// APRÈS (production)
export const API_URL = 'https://votre-backend-deploye.com';
```

### 3.2 Modifier les numéros de téléphone (optionnel)

Dans `app/src/config.ts`, mettez vos vrais numéros :

```typescript
export const PHONE_NUMBERS = {
  PHONE_1: '+227 90 12 34 56',  // Votre premier numéro
  PHONE_2: '+227 92 34 56 78',  // Votre deuxième numéro
  WHATSAPP: '+227 90 12 34 56', // Votre numéro WhatsApp
  EMAIL: 'contact@yaourtdusahel.ne',
  LOCATION: 'Zinder'
};
```

### 3.3 Rebuild et Redeploy

```bash
cd app
npm install
npm run build
```

Puis déployez le dossier `dist` sur votre hébergeur (Vercel, Netlify, etc.)

---

## 📋 Étape 4: Vérifier le déploiement

### Tester l'API
```bash
# Remplacez par votre URL
curl https://votre-backend-deploye.com/api/health

# Réponse attendue :
{
  "success": true,
  "message": "API Yaourt du Sahel est en ligne",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Tester les avis
```bash
curl https://votre-backend-deploye.com/api/reviews
```

### Tester une commande
```bash
curl -X POST https://votre-backend-deploye.com/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "telephone": "+227 90 00 00 00",
    "quantite": "10 yaourts"
  }'
```

---

## 📊 Structure du Projet

```
/mnt/okcomputer/output/
├── app/                    # Frontend React
│   ├── src/
│   │   ├── sections/       # Composants des pages
│   │   ├── services/       # API service
│   │   └── config.ts       # Configuration
│   ├── public/             # Images
│   └── dist/               # Build (à déployer)
│
├── backend/                # Backend Node.js
│   ├── server.js           # Serveur Express
│   ├── database.sql        # Schema PostgreSQL
│   ├── package.json
│   └── README.md
│
└── DEPLOY.md               # Ce fichier
```

---

## 🔧 Dépannage

### Problème: "Cannot connect to Supabase"
- Vérifiez que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont corrects
- Vérifiez que les tables ont été créées dans Supabase

### Problème: "CORS error"
- Dans `server.js`, vérifiez que `FRONTEND_URL` correspond à votre site
- Ou mettez `FRONTEND_URL=*` pour autoriser toutes les origines (déconseillé en prod)

### Problème: "Build failed"
- Vérifiez que Node.js 18+ est installé
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

---

## 📞 Support

En cas de problème :
1. Vérifiez les logs sur Railway/Render/Heroku
2. Testez l'API avec Postman ou curl
3. Vérifiez la console du navigateur pour les erreurs frontend

---

## 🎉 Félicitations !

Votre site Yaourt du Sahel est maintenant en ligne avec :
- ✅ Backend Node.js + Express
- ✅ Base de données PostgreSQL (Supabase)
- ✅ API pour commandes et avis
- ✅ Frontend React avec images
- ✅ 2 numéros de téléphone + WhatsApp
- ✅ Système d'évaluation clients
