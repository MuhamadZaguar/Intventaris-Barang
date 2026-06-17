import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const raw = localStorage.getItem('user')
		if (raw) {
			setUser(JSON.parse(raw))
		}
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		navigate('/login')
	}

	return (
		<div className="dashboard-container">
			<h2>Dashboard</h2>
			{user ? (
				<div>
					<p>Nama: {user.nama}</p>
					<p>Email: {user.email}</p>
					<p>Role: {user.role || 'user'}</p>
				</div>
			) : (
				<p>Memuat...</p>
			)}

			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}
