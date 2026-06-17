import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {/* Navbar di atas membentang penuh */}
      <header className="bg-white border-bottom shadow-sm z-3">
        <Navbar onToggleSidebar={() => setShowMobileSidebar(true)} />
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

      {/* Mobile Sidebar (Offcanvas) */}
      <div 
        className={`offcanvas offcanvas-start ${showMobileSidebar ? 'show' : ''}`} 
        style={{ visibility: showMobileSidebar ? 'visible' : 'hidden', width: '280px' }}
        tabIndex="-1"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Menu Navigasi</h5>
          <button type="button" className="btn-close" onClick={() => setShowMobileSidebar(false)}></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar onItemClick={() => setShowMobileSidebar(false)} />
        </div>
      </div>
      {/* Backdrop untuk mobile */}
      {showMobileSidebar && <div className="offcanvas-backdrop fade show" onClick={() => setShowMobileSidebar(false)}></div>}
    </div>
  );
};

export default DashboardLayout;