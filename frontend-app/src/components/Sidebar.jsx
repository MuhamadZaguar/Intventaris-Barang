import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Package, ArrowDownLeft, ArrowUpRight, Users, ClipboardCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ onItemClick }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid, roles: ['admin', 'staff', 'manager', 'karyawan'] },
    { path: '/barang', label: 'Data Barang', icon: Package, roles: ['staff'] },
    { path: '/barang-masuk', label: 'Barang Masuk', icon: ArrowDownLeft, roles: ['staff', 'manager'] },
    { path: '/barang-keluar', label: 'Barang Keluar', icon: ArrowUpRight, roles: ['staff', 'manager'] },
    { path: '/kelola-permintaan', label: 'Kelola Permintaan', icon: ClipboardCheck, roles: ['staff', 'manager'] },
    { path: '/users', label: 'Manajemen User', icon: Users, roles: ['admin'] },
    { path: '/permintaan', label: 'Permintaan Barang', icon: Package, roles: ['karyawan'] },
  ];

  // Filter menu berdasarkan role user
  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role || 'staff'));

  return (
    <div className="d-flex flex-column h-100 p-2 py-3">
      <p className="text-muted small fw-bold px-3 text-uppercase mb-2">Menu Utama</p>
      <nav className="nav nav-pills flex-column mb-auto">
        {filteredMenu.map((item) => {
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