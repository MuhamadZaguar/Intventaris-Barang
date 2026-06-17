import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card, Alert, Navbar, Container } from 'react-bootstrap';
import { PackageSearch } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, user } = useContext(AuthContext);
  const location = useLocation();

  // Tentukan tujuan redirect. 
  // Jika user datang dari root (/) atau tidak ada history, paksa ke /dashboard.
  // Jika user mencoba akses halaman spesifik (misal /users) lalu diminta login, arahkan kembali ke sana.
  const from = (!location.state?.from || location.state?.from?.pathname === '/') 
    ? '/dashboard' 
    : location.state.from.pathname;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Gunakan AuthContext untuk login (saat ini authService mock di src/services/api.js)
      const result = await login(formData.email, formData.password);
      if (result) {
        // Ambil role dari hasil login atau context untuk menentukan arah redirect
        const role = result.role || result.user?.role;
        
        if (role === 'manager' || role === 'karyawan') {
          navigate('/dashboard', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError('Login gagal, coba lagi.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  // Jika sudah terautentikasi, langsung arahkan ke dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      // Pastikan Manager dan Karyawan selalu ke Dashboard utama
      if (user.role === 'manager' || user.role === 'karyawan') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

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
        <Card className="shadow card-rounded" style={{ width: '28rem' }}>
          <Card.Body>
            <Card.Title className="text-center mb-3">Selamat Datang</Card.Title>
            <Card.Subtitle className="mb-3 text-muted text-center">Silakan masuk ke akun Sistem Inventori Anda</Card.Subtitle>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Alamat Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="nama@perusahaan.com" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <div className="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <a href="#" className="small">Lupa password?</a>
                </div>
                <Form.Control type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3 small text-muted">
              Belum punya akun? <Link to="/Register">Daftar sekarang</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;