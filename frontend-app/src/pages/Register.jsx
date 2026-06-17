import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'

export default function Register() {
	const [nama, setNama] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			const res = await register({ nama, email, password })
			// backend returns message on success
			console.info('register success', res)
			navigate('/login')
		} catch (err) {
			console.error('register error', err)
			if (err?.response) {
				// server responded with a status outside 2xx
				const msg = err.response.data?.message || `${err.response.status} ${err.response.statusText}`
				setError(msg)
			} else if (err?.request) {
				// request was made but no response
				setError('Server tidak merespon. Periksa koneksi atau backend')
			} else {
				setError(err.message || 'Terjadi kesalahan')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="auth-container">
			<h2>Daftar</h2>
			<form onSubmit={handleSubmit} className="auth-form">
				<label>
					Nama
					<input value={nama} onChange={(e) => setNama(e.target.value)} required />
				</label>

				<label>
					Email
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</label>

				<label>
					Password
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</label>

				{error && <div className="error">{error}</div>}

				<button type="submit" disabled={loading}>{loading ? 'Mendaftarkan...' : 'Daftar'}</button>
			</form>

			<p>
				Sudah punya akun? <Link to="/login">Login</Link>
			</p>
		</div>
	)
}
