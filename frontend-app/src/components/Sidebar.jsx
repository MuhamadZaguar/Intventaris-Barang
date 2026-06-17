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
    <div className="d-flex flex-column h-100">
      <div className="mb-4">
        <Link to="/dashboard" className="d-flex align-items-center text-decoration-none text-dark">
          <div className="bg-primary text-white p-2 rounded me-2">
            <PackageSearch />
          </div>
          <h4 className="mb-0">Stock<span className="text-primary">ify</span></h4>
        </Link>
      </div>

      <nav className="nav flex-column">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className={`nav-link d-flex align-items-center py-2 text-sm ${isActive ? 'active fw-bold' : 'text-muted'}`}>
              <Icon className="me-2" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* logout removed per user request - handled in Navbar */}
    </div>
  );
};

export default Sidebar;