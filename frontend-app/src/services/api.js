// src/services/api.js
// import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({ baseURL: BASE_URL });

export const authService = {
  login: async (credentials) => {
    // return await api.post('/auth/login', credentials);
    return new Promise((resolve) => setTimeout(() => {
      resolve({ data: { token: 'mock-jwt-token', user: { name: 'Admin Gudang', role: 'admin' } } });
    }, 1000));
  }
};

export const dashboardService = {
  getStats: async () => {
    // return await api.get('/dashboard');
    return new Promise((resolve) => setTimeout(() => {
      resolve({ data: { totalBarang: 1250, barangMasuk: 85, barangKeluar: 42 } });
    }, 500));
  }
};

export const barangService = {
  getAll: async () => {
    // return await api.get('/barang');
    return new Promise((resolve) => setTimeout(() => {
      resolve({ data: [
        { _id: '1', kode: 'BRG001', nama: 'Laptop Asus ROG', kategori: 'Elektronik', stok: 15, harga: 15000000 },
        { _id: '2', kode: 'BRG002', nama: 'Kertas HVS A4', kategori: 'ATK', stok: 120, harga: 45000 },
      ]});
    }, 500));
  }
};