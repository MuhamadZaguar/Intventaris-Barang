// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Package, ArrowDownRight, ArrowUpRight, AlertTriangle, Clock } from 'lucide-react';
import { dashboardService } from '../services/api';
import DashboardCharts from '../components/DashboardCharts';

// --- Komponen Mini: StatCard (defined here for Tailwind styling) ---
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

// --- Utility function for time formatting (can be moved to a separate file) ---
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} detik yang lalu`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari yang lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

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
            <Clock size={12} /> {formatTimeAgo(trx.createdAt)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-extrabold ${isMasuk ? 'text-emerald-600' : 'text-orange-600'}`}>
          {isMasuk ? '+' : '-'}{trx.qty} Unit
        </p>
        <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{trx._id}</p>
      </div>
    </div>
  );
};

// --- Komponen Utama: Dashboard ---
const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await dashboardService.getStats(); // Assuming getStats() returns all data
        const d = res.data || {};
        console.log('Dashboard data:', d); // Debugging: check what the backend returns

        // Set summary stats
        setStats([
          { id: 1, title: 'Total Barang', value: (d.totalBarang || 0).toLocaleString(), Icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { id: 2, title: 'Total Pengguna', value: (d.totalUser || 0).toLocaleString(), Icon: ArrowDownRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { id: 3, title: 'Barang Masuk', value: (d.totalMasuk || 0).toLocaleString(), Icon: ArrowDownRight, color: 'text-orange-600', bg: 'bg-orange-50' },
          { id: 4, title: 'Barang Keluar', value: (d.totalKeluar || 0).toLocaleString(), Icon: ArrowUpRight, color: 'text-rose-600', bg: 'bg-rose-50' },
        ]);

        // Prepare data for Pie Chart
        if (d.kategori && Array.isArray(d.kategori)) {
          setPieChartData({
            labels: d.kategori.map(k => k.kategori),
            data: d.kategori.map(k => k.count),
          });
        }

        // Prepare data for Line Chart
        if (d.monthly) {
          setLineChartData({
            labels: d.monthly.labels,
            masuk: d.monthly.masuk,
            keluar: d.monthly.keluar,
          });
        }

        // Set recent transactions (assuming backend provides this)
        setRecentTransactions(d.recentTransactions || []); // Use actual data if available
      } catch (err) {
        console.error('Error fetching dashboard data', err);
        setErrorMsg(err?.response?.data?.message || err.message || 'Gagal memuat data dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (errorMsg) return (
    <div className="container py-4">
      <div className="alert alert-danger">{errorMsg}</div>
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
              <TransactionItem key={trx._id} trx={trx} />
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan Stok & Placeholder Grafik */}
        <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Distribusi Stok</h3>
          
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100/50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-8">
              <div className="flex-1">
                <DashboardCharts pieData={pieChartData} lineData={lineChartData} />
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;