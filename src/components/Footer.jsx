import React from "react";
import {  FaBookOpen, FaUser, FaBook } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import "../Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-item">
        <Link to="/">
        <div className="footer-icon-container">
          <AiFillHome className="footer-icon" />
           <span>Home</span>
        </div>
        </Link>
      
        <Link to="/modules">
        <div className="footer-icon-container">
          <FaBookOpen className="footer-icon" />
          <span>Modules</span>
        </div>
        </Link>
      <Link to="/dictionary">
        <div className="footer-icon-container">
          <FaBook className="footer-icon" />
          <span>Dictionary</span>
        </div>
        </Link>
      <Link to="/profile">
        <div className="footer-icon-container">
          <FaUser className="footer-icon" />
          <span>Profile</span>
        </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;