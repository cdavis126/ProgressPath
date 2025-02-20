import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container-fluid px-3">
        {/* Left side of the navbar */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2 white-text" to="/dashboard">
          <i className="bi bi-sign-intersection-y-fill white-text"></i>
          ProgressPath
        </Link>
        {/* Right side of the navbar */}
        <div className="ml-auto d-flex align-items-center gap-3">
          <Link to="/add" className="nav-icon white-text">
            <i className="bi bi-patch-plus-fill"/> {/* Eventually Link to Habit Modal*/}
          </Link>
          <Link to="/Searchboard" className="nav-icon white-text">
          <i className="bi bi-search-heart"></i> {/* Eventually Link to API Board Page */}
          </Link>
          <Link to="/profile" className="nav-icon white-text">
            <i className="bi bi-person-circle"/> {/* Eventually Link to Profile Modal*/}
          </Link>
          <Link to="/" className="white-text">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

