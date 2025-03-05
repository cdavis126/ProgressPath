import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../context/authContext";
import { FiLogOut } from "react-icons/fi";
import Typewriter from "typewriter-effect";

interface HeaderProps {
  setShowModal: (show: boolean) => void;
}

const Header = ({ setShowModal }: HeaderProps) => {
  const { user, logout } = useAuth();

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
          
          {/* Left Section: ProgressPath Logo */}
          <div className="d-flex align-items-center">
            <Link to="/dashboard" className="text-dark" aria-label="Go to Dashboard">
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
                      "Small steps lead to big changes 🚶‍♂️",
                      "Your habits shape your future! 🎯",
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
                color: "white",
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

            {/* Profile Icon */}
            <Link to="/profile" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "44px", height: "44px", padding: "0" }}
              aria-label="Profile">
              <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
            </Link>

            {/* Logout Button */}
            {user && (
              <button
                onClick={logout}
                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  padding: "0",
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
    </>
  );
};

export default Header;