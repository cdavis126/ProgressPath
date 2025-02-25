import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavLimited.css";

const NavLimited: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container-fluid px-4">
        {/* Logo (Left Aligned) */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-sign-intersection-y-fill"></i> ProgressPath
        </Link>

        {/* Navigation Links (Centered) */}
        <div className="nav-links ms-auto d-flex align-items-center gap-4">
          <Link to="/dashboard" className="nav-item">Goals</Link>
          <Link to="/dashboard" className="nav-item">Progress</Link>
          <Link to="/pathboard" className="nav-item">Inspiration</Link>
        </div>

        {/* Buttons (Right Aligned) */}
        <div className="nav-buttons d-flex align-items-center gap-3">
          <Link to="/login" className="btn btn-outline-dark">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavLimited;
