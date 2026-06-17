import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Form, Button, Card, Alert, Navbar, Container } from 'react-bootstrap';
import { PackageSearch, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) return setError('Konfirmasi password tidak cocok');
    if (password.length < 6) return setError('Password minimal 6 karakter');

    setLoading(true);
    try {
      await authService.resetPassword({ email, password });
      setSuccess('Password berhasil diperbarui. Mengalihkan ke halaman login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mereset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar bg="light" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-dark">
            <div className="bg-primary text-white p-2 rounded me-2 d-flex align-items-center justify-content-center">
              <PackageSearch size={18} />
            </div>
            <span className="fw-bold">Stock<span className="text-primary">ify</span></span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 56px)' }}>
        <Card className="shadow" style={{ width: '28rem' }}>
          <Card.Body>
            <div className="mb-3">
              <Link to="/login" className="text-decoration-none small d-flex align-items-center gap-1">
                <ArrowLeft size={14} /> Kembali ke Login
              </Link>
            </div>
            <Card.Title className="fw-bold">Reset Password</Card.Title>
            <Card.Subtitle className="mb-4 text-muted small">Masukkan email Anda dan buat password baru.</Card.Subtitle>

            {error && <Alert variant="danger" className="small">{error}</Alert>}
            {success && <Alert variant="success" className="small">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="nama@perusahaan.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password Baru</Form.Label>
                <Form.Control type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Konfirmasi Password Baru</Form.Label>
                <Form.Control type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Memproses...' : 'Reset Password'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;