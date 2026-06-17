import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'

export default function Register() {
	const [nama, setNama] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		try {
			await register({ nama, email, password })
			navigate('/login')
		} catch (err) {
			setError(err?.response?.data?.message || 'Terjadi kesalahan')
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

				<button type="submit">Daftar</button>
			</form>

			<p>
				Sudah punya akun? <Link to="/login">Login</Link>
			</p>
		</div>
	)
}
