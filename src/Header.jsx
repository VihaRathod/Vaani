import App from "./App";
import MainLogo from './images/MainLogo.png';

import React from "react";

const Header = () => {
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
            <img className="Vaani" src={MainLogo} style={{ width: "150px", height: "auto" }} ></img>
             </span>
        </a>

        <ul className="nav nav-pills">
          
          <li className="nav-item">
            <a href="#" className="nav-link" style={{ color: "#5a6e6c" }}>
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" style={{ color: "#5a6e6c" }}>
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" style={{ color: "#5a6e6c" }}>
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" style={{ color: "#5a6e6c" }}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className="nav-link active"
              style={{ 
                backgroundColor: "#5a6e6c",
                color: "#f4f3ef" 
              }}
              aria-current="page"
            >
              Start Learning
            </a>
          </li>
        </ul>
      </header>

      {/* CSS for hover states */}
      <style>{`
        .nav-pills .nav-link:not(.active):hover {
          color: #5a6e6c;
          opacity: 0.8;
        }
        .nav-pills .nav-link.active:hover {
          color: #f4f3ef;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Header;