import { Bell } from 'lucide-react';

const Navbar = () => {
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
            <div className="ms-2">
              <div className="fw-semibold">Administrator</div>
              <div className="small text-muted">admin@stockify.com</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;