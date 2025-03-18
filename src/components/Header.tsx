import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/">UNIQLO</Link>
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="/">Home</Link>
        <Link className="nav-item nav-link" to="/shop">Shop</Link>
        <Link className="nav-item nav-link" to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Header;
