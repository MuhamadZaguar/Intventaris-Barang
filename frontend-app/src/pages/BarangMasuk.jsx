import React, { useEffect, useState } from 'react';
import { barangService, barangMasukService } from '../services/api';

const BarangMasuk = () => {
	const [barangList, setBarangList] = useState([]);
	const [selectedBarang, setSelectedBarang] = useState('');
	const [jumlah, setJumlah] = useState(1);
	const [transaksiList, setTransaksiList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const loadBarang = async () => {
		try {
			const res = await barangService.getAll();
			setBarangList(res.data || []);
			if ((res.data || []).length > 0) setSelectedBarang(res.data[0]._id);
		} catch (err) {
			console.error(err);
			setError('Gagal memuat daftar barang');
		}
	};

	const loadTransaksi = async () => {
		try {
			const res = await barangMasukService.getAll();
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
			const res = await barangMasukService.create(payload);
			// append to transaksi list
			setTransaksiList((s) => [res.data, ...s]);
			// refresh barang list to get updated stok
			await loadBarang();
			setJumlah(1);
		} catch (err) {
			console.error(err);
			setError(err?.response?.data?.message || 'Gagal menambahkan barang masuk');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container py-4">
			<h2>Barang Masuk</h2>

			<div className="card mb-4">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Pilih Barang</label>
							<select className="form-select" value={selectedBarang} onChange={(e) => setSelectedBarang(e.target.value)}>
								{barangList.map((b) => (
									<option key={b._id} value={b._id}>{b.nama} (stok: {b.stok})</option>
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

			<div>
				<h5>Transaksi Terakhir</h5>
				{transaksiList.length === 0 && <p className="text-muted">Belum ada transaksi</p>}
				<ul className="list-group">
					{transaksiList.map((t) => (
						<li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
							<div>
								<div className="fw-bold">{t.barang_id?.nama || '—'}</div>
								<small className="text-muted">Jumlah: {t.jumlah}</small>
							</div>
							<small className="text-muted">{new Date(t.createdAt).toLocaleString()}</small>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BarangMasuk;
