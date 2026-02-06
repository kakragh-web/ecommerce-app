const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

console.log('=== API Service Initialized ===');
console.log('Environment:', import.meta.env.MODE);
console.log('API_BASE_URL:', API_BASE_URL);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

class ApiService {
  // Auth endpoints
  static async register(userData) {
    const url = `${API_BASE_URL}/auth/register`;
    console.log('Registering at URL:', url);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  }

  static async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  }

  // Product endpoints
  static async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  }

  static async createProduct(productData, token) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    return response.json();
  }

  static async updateProduct(id, productData, token) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    return response.json();
  }

  static async deleteProduct(id, token) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }

  // Order endpoints
  static async createOrder(orderData, token) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    return response.json();
  }

  static async getUserOrders(token) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }

  // Admin functions
  static async getAllOrders(token) {
    const response = await fetch(`${API_BASE_URL}/orders/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }

  static async updateOrderStatus(id, status, token) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
}

export default ApiService;