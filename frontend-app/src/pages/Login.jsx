import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		try {
			const data = await login({ email, password })
			// response contains token and user
			if (data.token) {
				localStorage.setItem('token', data.token)
				localStorage.setItem('user', JSON.stringify(data.user))
				navigate('/dashboard')
			} else {
				setError('Login gagal')
			}
		} catch (err) {
			setError(err?.response?.data?.message || 'Terjadi kesalahan')
		}
	}

	return (
		<div className="auth-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="auth-form">
				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>

				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				{error && <div className="error">{error}</div>}

				<button type="submit">Masuk</button>
			</form>

			<p>
				Belum punya akun? <Link to="/register">Daftar</Link>
			</p>
		</div>
	)
}
