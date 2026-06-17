// src/pages/Barang.jsx
import React, { useState, useEffect } from 'react';
import { barangService, barangAdminService } from '../services/api';

const Barang = () => {
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('Umum');
  const [stok, setStok] = useState(0);
  const [harga, setHarga] = useState(0);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      const response = await barangService.getAll();
      setBarangList(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const payload = {
        kode_barang: kode,
        nama_barang: nama,
        kategori,
        stok: Number(stok),
        harga: Number(harga),
      };
      const res = await barangAdminService.create(payload);
      // refresh list
      await fetchList();
      // reset form
      setKode(''); setNama(''); setKategori('Umum'); setStok(0); setHarga(0);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Gagal membuat barang');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4">Data Barang</h1>
      </div>

      <div className="row">
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Tambah Barang</h5>
              <form onSubmit={handleCreate}>
                <div className="mb-2">
                  <label className="form-label">Kode Barang</label>
                  <input className="form-control" value={kode} onChange={e => setKode(e.target.value)} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Nama Barang</label>
                  <input className="form-control" value={nama} onChange={e => setNama(e.target.value)} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Kategori</label>
                  <input className="form-control" value={kategori} onChange={e => setKategori(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Stok</label>
                  <input type="number" className="form-control" value={stok} onChange={e => setStok(e.target.value)} min={0} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Harga</label>
                  <input type="number" className="form-control" value={harga} onChange={e => setHarga(e.target.value)} min={0} />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button className="btn btn-primary" disabled={creating}>{creating ? 'Menyimpan...' : 'Buat Barang'}</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Daftar Barang</h5>
              {loading ? <p>Memuat...</p> : (
                <ul className="list-group">
                  {barangList.map(b => (
                    <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">{b.nama_barang}</div>
                        <small className="text-muted">{b.kode_barang} • {b.kategori}</small>
                      </div>
                      <div className="text-end">
                        <div>Stok: <span className="fw-bold">{b.stok}</span></div>
                        <div className="text-muted">Rp {b.harga}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barang;
