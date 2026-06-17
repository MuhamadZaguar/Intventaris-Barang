// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Package, ArrowDownRight, ArrowUpRight, AlertTriangle, Clock } from 'lucide-react';
import { dashboardService } from '../services/api';

// --- Komponen Mini: StatCard ---
const StatCard = ({ title, value, Icon, color, bg }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-extrabold text-gray-900">{value}</p>
      </div>
      <div className={`p-4 rounded-xl ${bg}`}>
        <Icon className={`w-7 h-7 ${color}`} strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

// --- Komponen Mini: TransactionItem ---
const TransactionItem = ({ trx }) => {
  const isMasuk = trx.type === 'Masuk';
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-lg ${isMasuk ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
          {isMasuk ? <ArrowDownRight size={22} /> : <ArrowUpRight size={22} />}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{trx.item}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
            <Clock size={12} /> {trx.time}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-extrabold ${isMasuk ? 'text-emerald-600' : 'text-orange-600'}`}>
          {isMasuk ? '+' : '-'}{trx.qty} Unit
        </p>
        <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{trx.id}</p>
      </div>
    </div>
  );
};

// --- Komponen Utama: Dashboard ---
const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi Fetch API
    dashboardService.getStats().then((res) => {
      setStats([
        { id: 1, title: 'Total Jenis Barang', value: res.data.totalBarang.toLocaleString(), Icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 2, title: 'Barang Masuk (Bulan Ini)', value: res.data.barangMasuk, Icon: ArrowDownRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 3, title: 'Barang Keluar (Bulan Ini)', value: res.data.barangKeluar, Icon: ArrowUpRight, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 4, title: 'Stok Menipis (<5 Unit)', value: 18, Icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
      ]);
      setLoading(false);
    });

    setRecentTransactions([
      { id: 'TRX001', type: 'Masuk', item: 'Laptop Dell XPS 13', qty: 25, time: '30 menit yang lalu' },
      { id: 'TRX002', type: 'Keluar', item: 'Monitor LG 24"', qty: 5, time: '1 jam yang lalu' },
      { id: 'TRX003', type: 'Masuk', item: 'Keyboard Keychron K2', qty: 50, time: '2 jam yang lalu' },
      { id: 'TRX004', type: 'Keluar', item: 'Mouse Logitech MX Master', qty: 12, time: 'Kemarin' },
    ]);
  }, []);

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Halaman */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Ringkasan Inventori</h2>
        <p className="mt-1.5 text-sm text-gray-500 font-medium">Selamat datang kembali, Admin! Berikut ikhtisar data hari ini.</p>
      </div>

      {/* Statistik Utama - Grid Kartu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Bagian Bawah - 2 Kolom */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Transaksi Terbaru (Lebih Lebar) */}
        <div className="xl:col-span-2 bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Aktivitas Transaksi Terbaru</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((trx) => (
              <TransactionItem key={trx.id} trx={trx} />
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan Stok & Placeholder Grafik */}
        <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Distribusi Stok</h3>
          
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100/50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm font-bold text-gray-700">Area Visualisasi Grafik</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Nantinya Anda bisa memasang library seperti <br/> 
                <span className="font-semibold text-gray-600">Recharts</span> atau <span className="font-semibold text-gray-600">Chart.js</span> di sini.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;