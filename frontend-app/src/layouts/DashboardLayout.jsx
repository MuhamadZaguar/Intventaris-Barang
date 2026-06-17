import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="d-flex vh-100">
      <aside className="sidebar bg-white border-end p-3">
        <Sidebar />
      </aside>

      <div className="flex-grow-1 d-flex flex-column">
        <header>
          <Navbar />
        </header>

        <main className="flex-grow-1 overflow-auto app-container">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;