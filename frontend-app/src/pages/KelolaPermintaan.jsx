import React, { useEffect, useState, useContext } from 'react';
import { permintaanService } from '../services/api';
import { Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Check, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const KelolaPermintaan = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllRequests = async () => {
    try {
      const res = await permintaanService.getAll();
      setRequests(res.data || []);
    } catch (err) {
      setError('Gagal memuat daftar permintaan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleAction = async (id, status) => {
    if (!window.confirm(`Yakin ingin ${status === 'Approved' ? 'menyetujui' : 'menolak'} permintaan ini?`)) return;
    try {
      await permintaanService.updateStatus(id, status);
      fetchAllRequests();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal memproses permintaan');
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Kelola Permintaan Barang</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Karyawan</th>
                  <th>Barang</th>
                  <th>Jumlah</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{new Date(req.createdAt).toLocaleDateString('id-ID')}</td>
                    <td>{req.user_id?.nama}</td>
                    <td>{req.barang_id?.nama_barang}</td>
                    <td>{req.jumlah}</td>
                    <td>{req.keterangan}</td>
                    <td>
                      <Badge bg={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'}>
                        {req.status}
                      </Badge>
                    </td>
                    <td>
                      {req.status === 'Pending' && user?.role === 'staff' && (
                        <div className="d-flex gap-2">
                          <Button variant="success" size="sm" onClick={() => handleAction(req._id, 'Approved')}>
                            <Check size={14} /> Terima
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleAction(req._id, 'Rejected')}>
                            <X size={14} /> Tolak
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default KelolaPermintaan;