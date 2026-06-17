import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { barangService } from '../services/api';

const DashboardStock = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    barangService.getAll().then(res => {
      setList(res.data || []);
    }).catch(e => console.error(e)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-4">Memuat data stok...</div>;

  return (
    <div>
      <div className="mb-3">
        <h2 className="h5">Distribusi Stok</h2>
        <p className="text-muted">Ringkasan distribusi stok per barang.</p>
      </div>

      <div className="card">
        <div className="card-body">
          {list.length === 0 ? <p className="text-muted">Tidak ada data barang.</p> : (
            <ul className="list-group">
              {list.map(b => (
                <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">{b.nama_barang}</div>
                    <small className="text-muted">{b.kode_barang} • {b.kategori}</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">{b.stok}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStock;
