import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RequireAuth from '../components/RequireAuth';
import BarangMasuk from '../pages/BarangMasuk';
import BarangKeluar from '../pages/BarangKeluar';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
  {/* Rute Halaman Login */}
  <Route path="/login" element={<Login />} />
  {/* Rute Halaman Register (case-sensitive) */}
  <Route path="/register" element={<Register />} />
  {/* Toleransi untuk kapitalisasi yang tidak konsisten */}
  <Route path="/Register" element={<Navigate to="/register" replace />} />
  <Route path="/health" element={<div className="p-8"><h1 className="text-2xl font-bold">App is healthy</h1><p>Masuk: /login, Dashboard: /</p></div>} />
        
        {/* Rute Dashboard yang menggunakan Layout Utama */}
  <Route path="/" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          {/* Jika akses ke "/", otomatis diarahkan ke /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Placeholder sementara untuk halaman lain agar tidak error saat diklik */}
          <Route path="barang" element={<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"><h2 className="text-xl font-bold">Halaman Data Barang</h2><p className="text-gray-500 text-sm mt-1">Segera hadir.</p></div>} />
          <Route path="barang-masuk" element={<BarangMasuk />} />
          <Route path="barang-keluar" element={<BarangKeluar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;