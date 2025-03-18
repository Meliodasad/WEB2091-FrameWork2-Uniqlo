import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img src="https://toppng.com/uploads/preview/uniqlo-logo-vector-11573942521rp32cmu2vg.png" alt="UNIQLO" style={{ height: "40px" }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Trang chủ</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Sản phẩm</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Liên hệ</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">Giới thiệu</Link></li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/search"><i className="fas fa-search"></i></Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login"><i className="fas fa-user"></i></Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
