import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
      <aside className="bg-white border-end d-none d-lg-block" style={{ width: '280px' }}>
        <Sidebar />
      </aside>

      <div className="flex-grow-1 d-flex flex-col min-w-0">
        <header className="bg-white border-bottom">
          <Navbar />
        </header>

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