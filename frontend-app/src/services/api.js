import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL
});

// otomatis kirim token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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
  // overview totals (totalBarang, totalUser, totalMasuk, totalKeluar)
  getOverview: async () => {
    return await api.get('/dashboard');
  },
  // detailed stats for charts
  getStats: async (search = '') => {
    return await api.get('/dashboard', { params: { search } });
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

// Excel export wrapper (blob)
barangService.exportExcel = async (params = {}) => {
  return await api.get('/barang/export/excel', { params, responseType: 'blob' });
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