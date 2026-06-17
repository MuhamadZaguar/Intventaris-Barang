import { Bell, Sun, Moon, PackageSearch } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Sinkronisasi input dengan URL jika berubah dari luar
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const isDashboard = location.pathname === '/dashboard';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard?search=${searchQuery}`);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white px-3" style={{ height: '64px' }}>
      <div className="container-fluid">
        {/* Brand/Logo dipindah ke Navbar */}
        <Link to="/dashboard" className="navbar-brand d-flex align-items-center text-decoration-none text-dark me-4">
          <div className="bg-primary text-white p-2 rounded me-2 d-flex align-items-center">
            <PackageSearch size={20} />
          </div>
          <span className="fw-bold">Stock<span className="text-primary">ify</span></span>
        </Link>

        <div className="vr d-none d-lg-block me-4" style={{ height: '30px' }}></div>

        {isDashboard ? (
          <form className="d-none d-md-flex flex-grow-1 max-w-sm me-auto" onSubmit={handleSearch}>
            <input 
              className="form-control form-control-sm border-0 bg-light" 
              type="search" 
              placeholder="Cari transaksi barang..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        ) : (
          <div className="me-auto"></div>
        )}

        <div className="d-flex align-items-center ms-auto">
          <button className="btn btn-link text-secondary me-2" onClick={toggleTheme} title="Ganti Tema">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

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