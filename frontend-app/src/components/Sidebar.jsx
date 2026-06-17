import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Package, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const Sidebar = ({ onItemClick }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { path: '/barang', label: 'Data Barang', icon: Package },
    { path: '/barang-masuk', label: 'Barang Masuk', icon: ArrowDownLeft },
    { path: '/barang-keluar', label: 'Barang Keluar', icon: ArrowUpRight },
  ];

  return (
    <div className="d-flex flex-column h-100 p-2 py-3">
      <p className="text-muted small fw-bold px-3 text-uppercase mb-2">Menu Utama</p>
      <nav className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link d-flex align-items-center mb-1 ${isActive ? 'active' : 'text-dark hover-bg-light'}`}
              onClick={onItemClick}
            >
              <Icon size={18} className="me-2" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;