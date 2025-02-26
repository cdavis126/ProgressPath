import { Link } from "react-router-dom";
import { useState } from 'react';
import AddGoalModal from '../DashBoard/addgoalmodal';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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
          {/* Modal Trigger - Replaced Link with Span */}
          <span className="nav-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <i className="bi bi-patch-plus-fill" style={{ fontSize: '1.5rem', color: '#6c5ce7' }}></i>
          </span>
          <Link to="/pathboard" className="nav-icon">
            <i className="bi bi-search-heart"></i>
          </Link>
          <Link to="/profile" className="nav-icon">
            <i className="bi bi-person-circle"></i> {/* Eventually Link to Profile Modal */}
          </Link>
          <Link to="/" className="btn btn-outline">
            Logout
          </Link>
        </div>
        {/* Goal Modal */}
        <AddGoalModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      </div>
    </nav>
  );
};

export default Navbar;


