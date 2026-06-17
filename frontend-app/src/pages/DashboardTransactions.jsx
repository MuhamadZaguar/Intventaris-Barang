import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react';
import { barangMasukService, barangKeluarService } from '../services/api';

const TransactionItem = ({ trx }) => {
  const isMasuk = trx && trx.jumlah && trx.jumlah > 0 && trx.__t !== 'Keluar';
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-2">
      <div>
        <div className="fw-bold">{trx?.barang_id?.nama_barang || trx?.barang_id?.nama || '—'}</div>
        <small className="text-muted"><Clock size={12} /> {new Date(trx?.createdAt).toLocaleString()}</small>
      </div>
      <div className={`fw-bold ${isMasuk ? 'text-success' : 'text-danger'}`}>{isMasuk ? '+' : '-'}{trx?.jumlah} Unit</div>
    </div>
  );
};

const DashboardTransactions = () => {
  const [masuk, setMasuk] = useState([]);
  const [keluar, setKeluar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([barangMasukService.getAll(), barangKeluarService.getAll()])
      .then(([mRes, kRes]) => {
        setMasuk(mRes.data || []);
        setKeluar(kRes.data || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-4">Memuat transaksi...</div>;

  const combined = [
    ...(masuk || []).map(t => ({ ...t, type: 'Masuk' })),
    ...(keluar || []).map(t => ({ ...t, type: 'Keluar' })),
  ].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <div className="mb-3">
        <h2 className="h5">Aktivitas Transaksi Terbaru</h2>
        <p className="text-muted">Gabungan transaksi masuk dan keluar, urut terbaru.</p>
      </div>

      {combined.length === 0 ? <p className="text-muted">Belum ada transaksi.</p> : (
        <div>
          {combined.map(trx => <TransactionItem key={trx._id} trx={trx} />)}
        </div>
      )}
    </div>
  );
};

export default DashboardTransactions;
