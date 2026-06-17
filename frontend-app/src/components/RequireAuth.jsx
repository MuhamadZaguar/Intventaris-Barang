import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RequireAuth = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login, preserve attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Jika rute memerlukan peran spesifik dan user tidak memilikinya
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Akses Ditolak</h2>
        <p className="text-muted">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    );
  }

  return children
}

export default RequireAuth
