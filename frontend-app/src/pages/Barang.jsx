// src/pages/Barang.jsx
import React, { useState, useEffect } from 'react';
import { barangService, barangAdminService } from '../services/api';

const Barang = () => {
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('');

  // form state
  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('Umum');
  const [stok, setStok] = useState(0);
  const [harga, setHarga] = useState(0);
  const [gambarFile, setGambarFile] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await barangService.getAll({ page, limit, search: searchTerm, kategori: filterKategori });
      // response.data: { data, meta }
      // backend returns { data, meta } when pagination enabled
      const payload = response.data && response.data.data ? response.data.data : response.data;
      setBarangList(payload || []);
      const meta = response.data.meta || {};
      setTotalPages(meta.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // refetch when page/limit/search/kategori changes
  useEffect(() => {
    fetchList();
  }, [page, limit, searchTerm, filterKategori]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      // client-side validation for file size
      if (gambarFile && gambarFile.size > 2 * 1024 * 1024) {
        setError('Ukuran gambar maksimal 2MB');
        setCreating(false);
        return;
      }

      const form = new FormData();
      form.append('kode_barang', kode);
      form.append('nama_barang', nama);
      form.append('kategori', kategori);
      form.append('stok', Number(stok));
      form.append('harga', Number(harga));
      if (gambarFile) form.append('gambar', gambarFile);
      const res = await barangAdminService.create(form);
      // refresh list
      await fetchList();
      // reset form
  setKode(''); setNama(''); setKategori('Umum'); setStok(0); setHarga(0); setGambarFile(null);
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
                <div className="mb-3">
                  <label className="form-label">Gambar (opsional)</label>
                  <input type="file" accept="image/*" className="form-control" onChange={e => setGambarFile(e.target.files[0])} />
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Daftar Barang</h5>
                <div className="d-flex gap-2">
                  <input placeholder="Cari nama atau kode" className="form-control form-control-sm" style={{ width: 220 }} value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }} />
                  <select className="form-select form-select-sm" style={{ width: 140 }} value={filterKategori} onChange={e => { setFilterKategori(e.target.value); setPage(1); }}>
                    <option value="">Semua Kategori</option>
                    <option value="Umum">Umum</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Kantor">Kantor</option>
                  </select>
                  <select className="form-select form-select-sm" style={{ width: 80 }} value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <button className="btn btn-sm btn-outline-secondary" onClick={async () => {
                    try {
                      const res = await barangService.exportPdf({ search: searchTerm, kategori: filterKategori });
                      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'barang-list.pdf';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      console.error('Export PDF gagal', err);
                      alert('Gagal mengekspor PDF');
                    }
                  }}>Export PDF</button>
                  <button className="btn btn-sm btn-outline-success" onClick={async () => {
                    try {
                      const res = await barangService.exportExcel({ search: searchTerm, kategori: filterKategori });
                      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'barang-list.xlsx';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      console.error('Export Excel gagal', err);
                      alert('Gagal mengekspor Excel');
                    }
                  }}>Export Excel</button>
                </div>
              </div>

              {loading ? <p>Memuat...</p> : (
                <ul className="list-group">
                  {barangList.map(b => (
                    <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="me-3" style={{ width: 60, height: 60 }}>
                          {b.gambar ? (
                            // backend serves files under /public
                            <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${b.gambar}`} alt={b.nama_barang} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 8 }} />
                          ) : (
                            <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: 8 }}>
                              <small className="text-muted">No Img</small>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="fw-bold">{b.nama_barang}</div>
                          <small className="text-muted">{b.kode_barang} • {b.kategori}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <div>Stok: <span className="fw-bold">{b.stok}</span></div>
                        <div className="text-muted">Rp {b.harga}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <small className="text-muted">Halaman {page} dari {totalPages}</small>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-2" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Sebelumnya</button>
                  <button className="btn btn-sm btn-outline-primary" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Selanjutnya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barang;
