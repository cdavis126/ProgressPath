import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../context/authContext";
import { FiLogOut } from "react-icons/fi";
import Typewriter from "typewriter-effect";
import UserProfile from "../Profile/UserProfile"; // Import profile modal

interface HeaderProps {
  setShowModal: (show: boolean) => void;
}

const Header = ({ setShowModal }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false); // Profile modal state

  return (
    <>
      <header
        style={{
          padding: "15px 0",
          minHeight: "60px",
          borderBottom: "1px solid #dee2e6",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center" style={{ padding: "0 16px" }}>
          
          {/* Left Section: ProgressPath Logo - Now links to Home Page */}
          <div className="d-flex align-items-center">
            <Link to="/home" className="text-dark" aria-label="Go to Home">
              <i className="bi bi-sign-intersection-y-fill" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
            </Link>
          </div>

          {/* Center Section: Typewriter Effect */}
          <div style={{ flex: 1, textAlign: "center", marginLeft: "20px" }}>
            <h2
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                fontFamily: "inherit",
                fontStyle: "normal",
                fontWeight: "normal",
              }}
            >
              <span style={{ fontStyle: "normal" }}>
                <Typewriter
                  options={{
                    strings: [
                      `${user ? `Welcome, ${user.username}!` : "Welcome to ProgressPath!"} 👋`,
                      "We're excited to see the path you choose to create! 🌟",
                      "Remember, small steps lead to big changes 🚶‍♂️",
                      "Your habits will shape your future tomorrow! 🎯",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 120,
                  }}
                />
              </span>
            </h2>
          </div>

          {/* Right Section: Buttons & Icons */}
          <div className="d-flex align-items-center" style={{ gap: "14px" }}>
            
            {/* Add Goal Button */}
            <button
              className="btn rounded-pill"
              style={{
                backgroundColor: "#ACECF7",
                borderColor: "#ACECF7",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "6px 12px",
              }}
              onClick={() => setShowModal(true)}
            >
              Add a new Goal
            </button>

            {/* Pathboard Icon */}
            <Link to="/pathboard" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "44px", height: "44px", padding: "0" }}
              aria-label="Pathboard">
              <i className="bi bi-search-heart" style={{ fontSize: "1.5rem" }}></i>
            </Link>

            {/* Profile Icon (Opens Profile Modal) */}
            <button
              onClick={() => setShowProfile(true)} // Opens modal
              className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "44px", height: "44px", padding: "0" }}
              aria-label="Profile"
            >
              <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
            </button>

            {/* Logout Button */}
            {user && (
              <button
                onClick={logout}
                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  padding: "0",
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Logout"
              >
                <FiLogOut />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Profile Modal (Opens when user clicks profile icon) */}
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

export default Header;
