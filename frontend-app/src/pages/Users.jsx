import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({ nama: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengambil data pengguna';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditData({ nama: user.nama, role: user.role });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('User berhasil dihapus');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus pengguna');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/auth/users/${selectedUser._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setSuccess('Data pengguna berhasil diperbarui');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui pengguna');
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4 fw-bold">Manajemen Pengguna</h2>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
          ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.nama}</td>
                  <td>{u.email}</td>
                  <td><span className="badge bg-info-subtle text-info">{u.role}</span></td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(u)}>Edit</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(u._id)}>Hapus</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Edit Pengguna</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control value={editData.nama} onChange={e => setEditData({...editData, nama: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={editData.role} onChange={e => setEditData({...editData, role: e.target.value})}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Simpan Perubahan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsersPage;