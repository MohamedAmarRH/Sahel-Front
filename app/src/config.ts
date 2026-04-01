// ============================================
// CONFIGURATION YAOURT DU SAHEL
// ============================================

// Numéros de téléphone
export const PHONE_NUMBERS = {
  // Deux numéros pour les appels
  PHONE_1: '+227 90 12 34 56',
  PHONE_2: '+227 92 34 56 78',
  
  // Un seul WhatsApp
  WHATSAPP: '+227 90 12 34 56',
  
  // Email
  EMAIL: 'contact@yaourtdusahel.ne',
  
  // Localisation
  LOCATION: 'Zinder, Niger'
};

// URL du backend API
// En développement local
// export const API_URL = 'http://localhost:3000';

// En production (à remplacer après déploiement du backend)
export const API_URL = 'https://sahel-production.up.railway.app';

// Configuration des produits
export const PRODUCTS = {
  YAOURT: {
    name: 'Yaourt Maison',
    flavors: ['Nature', 'Vanille', 'Datte'],
    size: '250ml',
    price: '200 FCFA'
  },
  TOUKOUDI: {
    name: 'Toukoudi Traditionnel',
    size: '250ml',
    price: '300 FCFA'
  }
};

// ============================================
// INSTRUCTIONS POUR LE DEPLOIEMENT BACKEND
// ============================================
// 1. Déployez le backend (dossier /backend)
// 2. Récupérez l'URL du backend déployé
// 3. Remplacez API_URL ci-dessus
// 4. Rebuild et redeploy le frontend
// ============================================
