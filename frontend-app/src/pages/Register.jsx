import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'
import { Form, Button, Card, Alert, Navbar, Container } from 'react-bootstrap'
import { PackageSearch } from 'lucide-react'

export default function Register() {
	const [nama, setNama] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const validate = () => {
		if (nama.trim().length < 2) return 'Nama minimal 2 karakter'
		if (!email.includes('@')) return 'Masukkan email yang valid'
		if (password.length < 6) return 'Password minimal 6 karakter'
		return null
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		const v = validate()
		if (v) return setError(v)

		setLoading(true)
		try {
			const res = await authService.register({ nama, email, password })
			console.info('register success', res.data)
			navigate('/login')
		} catch (err) {
			console.error('register error', err)
			if (err?.response) {
				const msg = err.response.data?.message || `${err.response.status} ${err.response.statusText}`
				setError(msg)
			} else if (err?.request) {
				setError('Server tidak merespon. Periksa koneksi atau backend')
			} else {
				setError(err.message || 'Terjadi kesalahan')
			}
		} finally {
			setLoading(false)
		}
	}

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
							<Card.Title className="text-center mb-3">Daftar</Card.Title>
							<Card.Subtitle className="mb-3 text-muted text-center">Buat akun untuk mulai menggunakan Sistem Inventaris</Card.Subtitle>

							{error && <Alert variant="danger">{error}</Alert>}

							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="nama">
									<Form.Label>Nama</Form.Label>
									<Form.Control value={nama} onChange={(e) => setNama(e.target.value)} required />
								</Form.Group>

								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
								</Form.Group>

								<Form.Group className="mb-3" controlId="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
									<Form.Text className="text-muted">Minimal 6 karakter</Form.Text>
								</Form.Group>

								<div className="d-grid">
									<Button variant="primary" type="submit" disabled={loading}>
										{loading ? 'Mendaftarkan...' : 'Daftar'}
									</Button>
								</div>
							</Form>

							<div className="text-center mt-3 small text-muted">
								Sudah punya akun? <Link to="/login">Login</Link>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
	)
}
