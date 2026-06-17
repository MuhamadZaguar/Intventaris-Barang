import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const DashboardCharts = ({ pieData, lineData }) => {
  if (!pieData || !lineData) return (
    <div className="d-flex align-items-center justify-content-center py-5 text-muted small font-italic">
      Memuat grafik...
    </div>
  );

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
    <div className="row g-4">
      <div className="col-12 mb-4 text-center">
        <p className="text-muted small fw-bold text-uppercase mb-3">Kategori Barang</p>
        <div style={{ maxHeight: '200px' }} className="d-flex justify-content-center">
          <Pie data={finalPieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } } }} />
        </div>
      </div>
      <div className="col-12">
        <p className="text-muted small fw-bold text-uppercase mb-3">Tren Transaksi</p>
        <div style={{ maxHeight: '180px' }}>
          <Line data={finalLineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { font: { size: 9 } } }, y: { ticks: { font: { size: 9 } } } } }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
