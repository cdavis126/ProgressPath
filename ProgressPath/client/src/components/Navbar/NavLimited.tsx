import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";

const NavLimited: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container-fluid px-3">
        {/* Logo (Left Aligned) */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-sign-intersection-y-fill"></i> ProgressPath
        </Link>

        {/* Buttons (Right Aligned) */}
        <div className="nav-buttons d-flex align-items-center gap-3">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavLimited;
