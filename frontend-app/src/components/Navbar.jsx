import { Bell } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <form className="d-flex" style={{ maxWidth: 420 }}>
          <input className="form-control me-2" type="search" placeholder="Cari barang atau transaksi..." aria-label="Search" />
        </form>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link position-relative text-secondary">
            <Bell />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
          </button>

          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-secondary" style={{ width: 40, height: 40 }} />
            <div className="ms-2 me-3">
              <div className="fw-semibold">{user?.nama || user?.name || 'Pengguna'}</div>
              <div className="small text-muted">{user?.email || '—'}</div>
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;