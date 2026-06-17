import { Bell } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white px-4 h-100">
      <div className="container-fluid">
        <form className="d-none d-md-flex w-25">
          <input className="form-control form-control-sm border-0 bg-light" type="search" placeholder="Cari data..." />
        </form>

        <div className="d-flex align-items-center ms-auto">
          <button className="btn btn-link text-secondary position-relative me-3">
            <Bell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </button>

          <div className="vr me-3 d-none d-sm-block"></div>

          <div className="d-flex align-items-center me-3 d-none d-sm-block text-end">
            <p className="small fw-bold mb-0 text-dark">{user?.nama || 'Admin'}</p>
            <p className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>{user?.email || 'admin@stockify.com'}</p>
          </div>

          <button className="btn btn-outline-danger btn-sm px-3 rounded-pill" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;