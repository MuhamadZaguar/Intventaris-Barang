// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({ baseURL: BASE_URL });

// export axios instance for callers that need it
export default api;

export const authService = {
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },
  register: async (payload) => {
    return await api.post('/auth/register', payload);
  }
};

export const dashboardService = {
  getStats: async () => {
    return await api.get('/dashboard');
  }
};

export const barangService = {
  getAll: async (params = {}) => {
    // params: { page, limit, search, kategori }
    return await api.get('/barang', { params });
  }
  ,
  exportPdf: async (params = {}) => {
    // return blob response
    return await api.get('/barang/export/pdf', { params, responseType: 'blob' });
  }
};

export const barangAdminService = {
  create: async (payload) => {
    // if payload is FormData (has append), send as multipart/form-data
    if (payload && typeof payload.append === 'function') {
      return await api.post('/barang', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return await api.post('/barang', payload);
  },
  update: async (id, payload) => {
    return await api.put(`/barang/${id}`, payload);
  },
  delete: async (id) => {
    return await api.delete(`/barang/${id}`);
  }
};

export const barangMasukService = {
  getAll: async () => {
    return await api.get('/barang-masuk');
  },
  create: async (payload) => {
    return await api.post('/barang-masuk', payload);
  }
};

export const barangKeluarService = {
  getAll: async () => {
    return await api.get('/barang-keluar');
  },
  create: async (payload) => {
    return await api.post('/barang-keluar', payload);
  }
};