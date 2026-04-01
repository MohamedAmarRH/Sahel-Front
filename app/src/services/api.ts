// ============================================
// API SERVICE - YAOURT DU SAHEL
// ============================================

import { API_URL } from '../config';

// Types
export interface Order {
  id?: string;
  nom: string;
  telephone: string;
  type_evenement?: string;
  date_evenement?: string;
  quantite: string;
  adresse?: string;
  message?: string;
  produits?: string[];
  status?: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  created_at?: string;
}

export interface Review {
  id?: string;
  name: string;
  rating: number;
  comment: string;
  likes?: number;
  created_at?: string;
}

export interface ContactMessage {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}

export interface Stats {
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    delivered: number;
  };
  reviews: {
    total: number;
    averageRating: number;
  };
}

// API Client
class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ==================== ORDERS ====================
  
  async getOrders(): Promise<{ success: boolean; data: Order[] }> {
    return this.fetch('/api/orders');
  }

  async getOrder(id: string): Promise<{ success: boolean; data: Order }> {
    return this.fetch(`/api/orders/${id}`);
  }

  async createOrder(order: Order): Promise<{ success: boolean; data: Order; message: string }> {
    return this.fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<{ success: boolean; data: Order }> {
    return this.fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteOrder(id: string): Promise<{ success: boolean; message: string }> {
    return this.fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== REVIEWS ====================
  
  async getReviews(): Promise<{ success: boolean; data: Review[]; meta: { total: number; averageRating: number } }> {
    return this.fetch('/api/reviews');
  }

  async createReview(review: Review): Promise<{ success: boolean; data: Review; message: string }> {
    return this.fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
    });
  }

  async likeReview(id: string): Promise<{ success: boolean; data: Review }> {
    return this.fetch(`/api/reviews/${id}/like`, {
      method: 'PUT',
    });
  }

  async deleteReview(id: string): Promise<{ success: boolean; message: string }> {
    return this.fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== CONTACT ====================
  
  async sendContact(message: ContactMessage): Promise<{ success: boolean; data: any; message: string }> {
    return this.fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  // ==================== STATS ====================
  
  async getStats(): Promise<{ success: boolean; data: Stats }> {
    return this.fetch('/api/stats');
  }

  async healthCheck(): Promise<{ success: boolean; message: string }> {
    return this.fetch('/api/health');
  }
}

// Export singleton instance
export const api = new ApiService();

// ============================================
// UTILITAIRES POUR LES NUMÉROS DE TÉLÉPHONE
// ============================================

import { PHONE_NUMBERS } from '../config';

export const getPhoneLinks = () => ({
  phone1: `tel:${PHONE_NUMBERS.PHONE_1.replace(/\s/g, '')}`,
  phone2: `tel:${PHONE_NUMBERS.PHONE_2.replace(/\s/g, '')}`,
  whatsapp: `https://wa.me/${PHONE_NUMBERS.WHATSAPP.replace(/\D/g, '')}`,
  email: `mailto:${PHONE_NUMBERS.EMAIL}`,
});

export const getPhoneDisplay = () => ({
  phone1: PHONE_NUMBERS.PHONE_1,
  phone2: PHONE_NUMBERS.PHONE_2,
  whatsapp: PHONE_NUMBERS.WHATSAPP,
  email: PHONE_NUMBERS.EMAIL,
  location: PHONE_NUMBERS.LOCATION,
});
