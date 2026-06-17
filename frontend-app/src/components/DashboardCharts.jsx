import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const DashboardCharts = ({ pieData, lineData }) => {
  if (!pieData || !lineData) return <p className="text-muted text-center py-4">Memuat grafik...</p>;

  const finalPieData = {
    labels: pieData.labels,
    datasets: [{
      data: pieData.data,
      backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6c757d', '#6610f2'],
    }]
  };

  const finalLineData = {
    labels: lineData.labels,
    datasets: [
      { label: 'Masuk', data: lineData.masuk, borderColor: '#198754', backgroundColor: 'rgba(25,135,84,0.2)', tension: 0.3 },
      { label: 'Keluar', data: lineData.keluar, borderColor: '#dc3545', backgroundColor: 'rgba(220,53,69,0.2)', tension: 0.3 }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-rounded p-4">
        <h5 className="mb-3">Kategori Barang</h5>
        <Pie data={finalPieData} />
      </div>
      <div className="card-rounded p-4">
        <h5 className="mb-3">Transaksi Bulanan (6 bulan terakhir)</h5>
        <Line data={finalLineData} />
      </div>
    </div>
  );
};

export default DashboardCharts;
