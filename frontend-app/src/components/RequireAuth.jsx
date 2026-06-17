import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RequireAuth = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login, preserve attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <div className="p-4">Anda tidak memiliki akses ke halaman ini.</div>
  }

  return children
}

export default RequireAuth
