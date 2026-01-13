import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const AuthService = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload)
};

export const PizzaService = {
  list: () => api.get('/pizzas')
};

export const OrderService = {
  create: (payload) => api.post('/orders', payload),

  myOrders: () => api.get('/orders/me'),        // aktif siparişler burada
  deliveredOrders: () => api.get('/orders/delivered'), // ✅ DOĞRU

  markDelivered: (orderId) =>
    api.patch(`/orders/${orderId}/deliver`)
};

export default api;

