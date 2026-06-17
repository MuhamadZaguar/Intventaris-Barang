import React, { useEffect, useState, useContext } from 'react';
import { barangService, barangKeluarService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BarangKeluar = () => {
  const { user } = useContext(AuthContext);
  const [barangList, setBarangList] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState('');
  const [kodeSearch, setKodeSearch] = useState('');
  const [jumlah, setJumlah] = useState(1);
  const [transaksiList, setTransaksiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBarang = async () => {
    try {
      const res = await barangService.getAll();
      // support backend paginated response { data, meta }
      const payload = res.data && res.data.data ? res.data.data : res.data;
      const arr = Array.isArray(payload) ? payload : [];
      setBarangList(arr);
      if (arr.length > 0) setSelectedBarang(arr[0]._id);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat daftar barang');
    }
  };

  const handleCariKode = () => {
    if (!kodeSearch) return setError('Masukkan kode barang untuk mencari');
    const found = barangList.find((b) => (b.kode_barang || b.kode || '').toLowerCase() === kodeSearch.trim().toLowerCase());
    if (found) {
      setSelectedBarang(found._id);
      setError(null);
    } else {
      setError('Barang dengan kode tersebut tidak ditemukan');
    }
  };

  const loadTransaksi = async () => {
    try {
      const res = await barangKeluarService.getAll();
      setTransaksiList(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBarang();
    loadTransaksi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { barang_id: selectedBarang, jumlah };
      const res = await barangKeluarService.create(payload);
      setTransaksiList((s) => [res.data, ...s]);
      await loadBarang();
      setJumlah(1);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Gagal menambahkan barang keluar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2>Barang Keluar</h2>

      {user?.role === 'staff' && (
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Cari berdasarkan Kode Barang</label>
              <div className="input-group">
                <input className="form-control" placeholder="Masukkan kode barang" value={kodeSearch} onChange={(e) => setKodeSearch(e.target.value)} />
                <button type="button" className="btn btn-outline-secondary" onClick={handleCariKode}>Cari</button>
              </div>
              <div className="form-text">Atau pilih dari daftar di bawah.</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Pilih Barang</label>
              <select className="form-select" value={selectedBarang} onChange={(e) => setSelectedBarang(e.target.value)}>
                {barangList.map((b) => (
                  <option key={b._id} value={b._id}>{(b.kode_barang || b.kode || '—')} — {(b.nama_barang || b.nama || '—')} (stok: {b.stok})</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Jumlah</label>
              <input type="number" className="form-control" min={1} value={jumlah} onChange={(e) => setJumlah(Number(e.target.value))} />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button className="btn btn-primary" disabled={loading}>{loading ? 'Menyimpan...' : 'Tambahkan'}</button>
          </form>
        </div>
      </div>
      )}

      <div>
        <h5>Transaksi Terakhir</h5>
        {transaksiList.length === 0 && <p className="text-muted">Belum ada transaksi</p>}
        <ul className="list-group">
          {transaksiList.map((t) => (
            <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="me-3" style={{ width: 40, height: 40 }}>
                  {t.barang_id?.gambar ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${t.barang_id.gambar}`} 
                      alt="" 
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: 4 }} 
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: 4 }}>
                      <small className="text-muted" style={{ fontSize: '10px' }}>No Img</small>
                    </div>
                  )}
                </div>
                <div>
                  <div className="fw-bold">{t.barang_id?.nama_barang || t.barang_id?.nama || '—'}</div>
                  <small className="text-muted">{(t.barang_id?.kode_barang || t.barang_id?.kode || '—')} • Jumlah: {t.jumlah}</small>
                </div>
              </div>
              <small className="text-muted">{new Date(t.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarangKeluar;
