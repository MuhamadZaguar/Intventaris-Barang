// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, ArrowDownRight, ArrowUpRight, AlertTriangle, Clock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { dashboardService } from '../services/api';
import DashboardCharts from '../components/DashboardCharts';

// --- Komponen Mini: StatCard (Bootstrap Version) ---
const StatCard = ({ title, value, Icon, color, bg }) => (
  <div className="card border-0 shadow-sm rounded-3 h-100">
    <div className="card-body d-flex align-items-center justify-content-between p-4">
      <div>
        <p className="text-muted small fw-bold text-uppercase mb-1">{title}</p>
        <h3 className="fw-bold mb-0 text-dark">{value}</h3>
      </div>
      <div className={`p-3 rounded-3 ${bg}`}>
        <Icon className={color} size={32} />
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
    <div className="list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 border-0 border-bottom">
      <div className="d-flex align-items-center">
        <div className={`p-2 rounded-3 me-3 ${isMasuk ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
          {isMasuk ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
        </div>
        <div>
          <p className="mb-0 fw-bold small text-dark">{trx.item}</p>
          <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
            <Clock size={12} /> {formatTimeAgo(trx.createdAt)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`mb-0 fw-bold ${isMasuk ? 'text-success' : 'text-danger'}`}>
          {isMasuk ? '+' : '-'}{trx.qty} Unit
        </p>
        <p className="mb-0 text-muted fw-bold" style={{ fontSize: '0.6rem' }}>#{trx._id.substring(0,8)}</p>
      </div>
    </div>
  );
};

// --- Komponen Utama: Dashboard ---
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Jangan set loading true sepenuhnya jika hanya pencarian agar UI tidak flicker berat
      setErrorMsg(null);
      try {
        const res = await dashboardService.getStats(searchQuery); 
        const d = res.data || {};

        // Set summary stats
        setStats([
          { id: 1, title: 'Total Barang', value: (d.totalBarang || 0).toLocaleString(), Icon: Package, color: 'text-primary', bg: 'bg-primary-subtle' },
          { id: 2, title: 'Total Pengguna', value: (d.totalUser || 0).toLocaleString(), Icon: ArrowDownRight, color: 'text-success', bg: 'bg-success-subtle' },
          { id: 3, title: 'Barang Masuk', value: (d.totalMasuk || 0).toLocaleString(), Icon: ArrowDownRight, color: 'text-warning', bg: 'bg-warning-subtle' },
          { id: 4, title: 'Barang Keluar', value: (d.totalKeluar || 0).toLocaleString(), Icon: ArrowUpRight, color: 'text-danger', bg: 'bg-danger-subtle' },
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
  }, [searchQuery]);

  if (loading) return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (errorMsg) return (
    <div className="container-fluid py-4">
      <div className="alert alert-danger">{errorMsg}</div>
    </div>
  );

  return (
    <div className="row g-4">
      {/* Header Halaman */}
      <div className="col-12">
        <h2 className="fw-bold text-dark h4 mb-1">{user?.role === 'admin' ? 'Panel Kontrol Admin' : 'Ringkasan Inventori'}</h2>
        <p className="text-muted small">
          Selamat datang kembali, <strong>{user?.nama || 'User'}</strong>! 
          Anda masuk sebagai <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
            {user?.role === 'admin' ? 'Administrator' : 
             user?.role === 'staff' ? 'Staff Gudang' : 
             user?.role === 'manager' ? 'Manajer' : user?.role || 'Guest'}
          </span>.
        </p>
      </div>

      {/* Statistik Utama - Grid Kartu */}
      {stats.map((stat) => (
        <div key={stat.id} className="col-12 col-sm-6 col-xl-3">
          <StatCard {...stat} />
        </div>
      ))}

      {/* Bagian Bawah - 2 Kolom */}
      <div className="col-xl-8">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="fw-bold mb-0">Transaksi Terbaru</h5>
              <button className="btn btn-sm btn-link text-decoration-none fw-bold">Lihat Semua</button>
            </div>
            <div className="list-group list-group-flush">
              {recentTransactions.map((trx) => (
                <TransactionItem key={trx._id} trx={trx} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Visualisasi Data</h5>
            <DashboardCharts pieData={pieChartData} lineData={lineChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;