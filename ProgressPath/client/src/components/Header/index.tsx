import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/authContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        padding: "15px 0",
        minHeight: "60px",
        borderBottom: "1px solid #dee2e6",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center" style={{ padding: "0 16px" }}>
        {/* Left Section: Welcome Message */}
        <div>
          <h4 style={{ marginBottom: "4px" }}>
            👋 {user ? `Welcome, ${user.username}!` : "Welcome to ProgressPath!"}
          </h4>
        </div>

        {/* Right Section: Navigation & Logout */}
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          {/* Navigation Icons */}
          {[{ icon: <FiSearch />, path: "/search" }, { icon: <FiUser />, path: "/profile" }].map(({ icon, path }, index) => (
            <button
              key={index}
              onClick={() => navigate(path)}
              className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px", padding: "0" }}
            >
              {icon}
            </button>
          ))}

          {/* Logout Button */}
          {user && (
            <button
              onClick={logout}
              className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px", padding: "0" }}
              aria-label="Logout"
            >
              <FiLogOut />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;




