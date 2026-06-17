import React, { useEffect, useState } from 'react';
import { barangService, permintaanService } from '../services/api';
import { Card, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { Clock, Send } from 'lucide-react';

const PermintaanBarang = () => {
  const [barangList, setBarangList] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState('');
  const [jumlah, setJumlah] = useState(1);
  const [keterangan, setKeterangan] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const loadBarang = async () => {
    try {
      const res = await barangService.getAll();
      const payload = res.data && res.data.data ? res.data.data : res.data;
      const list = Array.isArray(payload) ? payload : [];
      setBarangList(list);
      if (list.length > 0) setSelectedBarang(list[0]._id);
    } catch (err) {
      setError('Gagal memuat daftar barang');
    }
  };

  const loadMyRequests = async () => {
    try {
      const res = await permintaanService.getAllMy();
      setRequests(res.data || []);
    } catch (err) {
      console.error('Gagal memuat riwayat permintaan');
    }
  };

  useEffect(() => {
    loadBarang();
    loadMyRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    if (!selectedBarang) {
      setError('Silakan pilih barang terlebih dahulu');
      setLoading(false);
      return;
    }

    try {
      const payload = { barang_id: selectedBarang, jumlah, keterangan };

      await permintaanService.create(payload);

      setSuccess('Permintaan barang berhasil dikirim ke gudang.');
      setJumlah(1);
      setKeterangan('');
      loadMyRequests();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Gagal mengirim permintaan ke server';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Permintaan Barang</h2>

      <div className="row">
        <div className="col-md-5">
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <h5 className="mb-3">Formulir Permintaan</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Pilih Barang</Form.Label>
                  <Form.Select value={selectedBarang} onChange={(e) => setSelectedBarang(e.target.value)}>
                    {barangList.map((b) => (
                      <option key={b._id} value={b._id}>{b.nama_barang} (Tersedia: {b.stok})</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control type="number" min={1} value={jumlah} onChange={(e) => setJumlah(Number(e.target.value))} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Keperluan / Keterangan</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Contoh: Untuk keperluan meeting divisi..." value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required />
                </Form.Group>

                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                {success && <Alert variant="success" className="py-2 small">{success}</Alert>}

                <Button variant="primary" type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                  <Send size={18} /> {loading ? 'Mengirim...' : 'Kirim Permintaan'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-7">
          <h5 className="mb-3">Riwayat Permintaan Saya</h5>
          {requests.length === 0 ? (
            <p className="text-muted italic">Belum ada riwayat permintaan.</p>
          ) : (
            <ListGroup className="shadow-sm">
              {requests.map((req) => (
                <ListGroup.Item key={req._id} className="p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold">{req.barang_id?.nama_barang}</div>
                      <small className="text-muted d-block mb-1"><Clock size={12} /> {new Date(req.createdAt).toLocaleString()}</small>
                      <div className="small text-secondary">{req.keterangan}</div>
                    </div>
                    <div className="text-end">
                      <Badge bg={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'} className="mb-2">
                        {req.status || 'Pending'}
                      </Badge>
                      <div className="fw-bold">{req.jumlah} Unit</div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermintaanBarang;