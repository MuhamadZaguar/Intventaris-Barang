import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {/* Navbar di atas membentang penuh */}
      <header className="bg-white border-bottom shadow-sm z-3">
        <Navbar />
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar di samping di bawah Navbar */}
        <aside className="bg-white border-end d-none d-lg-block" style={{ width: '260px' }}>
          <Sidebar />
        </aside>

        {/* Konten Utama */}
        <main className="flex-grow-1 overflow-auto p-4">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;