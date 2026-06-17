import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);
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
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
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
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
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
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;