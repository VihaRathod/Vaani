import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import MainLogo from '../images/MainLogo.png';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleStartLearning = () => {
    if (user) {
      navigate("/modules"); // already logged in → go to modules
    } else {
      navigate("/signup");  // not logged in → sign up
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to home after logout
  };
  
  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32" aria-hidden="true">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">
            <img
              className="Vaani"
              src={MainLogo}
              style={{ width: "150px", height: "auto" }}
              alt="Main Logo"
            />
          </span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <button
              onClick={handleStartLearning}
              className="nav-link active"
              style={{
                backgroundColor: "#5a6e6c",
                color: "#f4f3ef",
                fontFamily: "Frank Ruhl Libre",
                border: "none",
                borderRadius: "12px",
                padding: "8px 16px",
                marginRight: "8px",
              }}
            >
              {user ? "Continue Learning" : "Start Learning"}
            </button>
          </li>
          
          {/* Show logout button if user is logged in */}
          {user && (
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{
                  backgroundColor: "transparent",
                  color: "#5a6e6c",
                  fontFamily: "Frank Ruhl Libre",
                  border: "1px solid #5a6e6c",
                  borderRadius: "12px",
                  padding: "8px 16px",
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </header>

      {/* CSS for hover states */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300..900&family=Yeseva+One&display=swap');

        .nav-pills .nav-link {
          font-family: 'Frank Ruhl Libre', serif;
          color: #5a6e6c;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-weight: 600;
        }

        /* Non-active links */
        .nav-pills .nav-link:not(.active):hover,
        .nav-pills .nav-link:not(.active):active {
          color: #788c8a;
          background-color: #f8f9fa;
        }

        /* Start Learning (active link) */
        .nav-pills .nav-link.active {
          background-color: #5a6e6c;
          color: #f4f3ef;
          font-weight: 300;
        }

        .nav-pills .nav-link.active:hover,
        .nav-pills .nav-link.active:active {
          background-color: #788c8a;
          color: #ffffff;
        }

        .nav-pills .nav-link {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Header;