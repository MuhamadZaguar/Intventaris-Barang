import React, { useEffect, useState } from 'react';
import { Package, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { dashboardService } from '../services/api';

const StatCard = ({ title, value, Icon, color, bg }) => (
  <div className="bg-white p-4 rounded-2xl border shadow-sm">
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <p className="text-muted mb-1 small">{title}</p>
        <p className="h4 mb-0">{value}</p>
      </div>
      <div className={`p-3 rounded-circle ${bg}`}>
        <Icon className={`text-${color}`} size={24} />
      </div>
    </div>
  </div>
);

const DashboardSummary = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getStats().then((res) => {
      const d = res.data || {};
      setStats([
        { id: 1, title: 'Total Barang', value: (d.totalBarang || 0).toLocaleString(), Icon: Package, color: 'primary', bg: 'bg-light' },
        { id: 2, title: 'Total Pengguna', value: d.totalUser || 0, Icon: ArrowDownRight, color: 'success', bg: 'bg-light' },
        { id: 3, title: 'Barang Masuk', value: d.totalMasuk || 0, Icon: ArrowDownRight, color: 'warning', bg: 'bg-light' },
        { id: 4, title: 'Barang Keluar', value: d.totalKeluar || 0, Icon: ArrowUpRight, color: 'danger', bg: 'bg-light' },
      ]);
      setLoading(false);
    }).catch((e) => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-5">Memuat statistik...</div>;

  return (
    <div>
      <div className="mb-3">
        <h2 className="h5">Ringkasan Inventori</h2>
        <p className="text-muted">Statistik singkat untuk inventori Anda.</p>
      </div>

      <div className="row g-3">
        {stats.map(s => (
          <div key={s.id} className="col-12 col-sm-6 col-lg-3">
            <StatCard {...s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
