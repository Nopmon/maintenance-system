import axios from 'axios';

// ตั้งค่า API URL
const API_URL = 'https://maintenance-system-app.herokuapp.com/api';

// สร้าง axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// เพิ่ม token ให้ทุก request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH API ============
export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// ============ WORK ORDERS API ============
export const workOrdersAPI = {
  getAll: () => 
    api.get('/work-orders'),
  
  create: (data) => 
    api.post('/work-orders', data),
  
  getById: (id) => 
    api.get(`/work-orders/${id}`),
  
  update: (id, data) => 
    api.put(`/work-orders/${id}`, data),
  
  delete: (id) => 
    api.delete(`/work-orders/${id}`),
  
  updateStatus: (id, status) => 
    api.patch(`/work-orders/${id}/status`, { status }),
};

// ============ ASSETS API ============
export const assetsAPI = {
  getAll: () => 
    api.get('/assets'),
  
  create: (data) => 
    api.post('/assets', data),
  
  getById: (id) => 
    api.get(`/assets/${id}`),
  
  update: (id, data) => 
    api.put(`/assets/${id}`, data),
  
  delete: (id) => 
    api.delete(`/assets/${id}`),
  
  getMaintenanceHistory: (id) => 
    api.get(`/assets/${id}/maintenance-history`),
};

// ============ TEAMS API ============
export const teamsAPI = {
  getAll: () => 
    api.get('/teams'),
  
  create: (data) => 
    api.post('/teams', data),
  
  getById: (id) => 
    api.get(`/teams/${id}`),
  
  update: (id, data) => 
    api.put(`/teams/${id}`, data),
  
  addMember: (teamId, userId) => 
    api.post(`/teams/${teamId}/members`, { userId }),
  
  removeMember: (teamId, userId) => 
    api.delete(`/teams/${teamId}/members/${userId}`),
};

// ============ DASHBOARD API ============
export const dashboardAPI = {
  getStats: () => 
    api.get('/dashboard/stats'),
  
  getPendingOrders: () => 
    api.get('/dashboard/pending-orders'),
};

// ============ REPORTS API ============
export const reportsAPI = {
  getMaintenanceHistory: (filters = {}) => 
    api.get('/reports/maintenance-history', { params: filters }),
  
  getCostAnalysis: (filters = {}) => 
    api.get('/reports/cost-analysis', { params: filters }),
  
  getEquipmentStatus: () => 
    api.get('/reports/equipment-status'),
  
  getTeamPerformance: () => 
    api.get('/reports/team-performance'),
};

export default api;