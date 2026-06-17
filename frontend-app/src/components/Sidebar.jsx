import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Package, ArrowDownLeft, ArrowUpRight, LogOut, PackageSearch } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { path: '/barang', label: 'Data Barang', icon: Package },
    { path: '/barang-masuk', label: 'Barang Masuk', icon: ArrowDownLeft },
    { path: '/barang-keluar', label: 'Barang Keluar', icon: ArrowUpRight },
  ];

  return (
    <div className="d-flex flex-column h-100 p-3">
      <Link to="/dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-dark">
        <div className="bg-primary text-white p-2 rounded me-2">
          <PackageSearch size={24} />
        </div>
        <span className="fs-4 fw-bold">Stock<span className="text-primary">ify</span></span>
      </Link>

      <hr />

      <nav className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link d-flex align-items-center mb-1 ${isActive ? 'active' : 'text-dark hover-bg-light'}`}
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