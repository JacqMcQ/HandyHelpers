import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";



const Header = () => {
  const isLoggedIn = Auth.loggedIn();

  const handleLogout = () => {
    Auth.logout();
  };
  

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <figure className="image is-64x64 logo-container">
            <img
              src="/images/HHLogo.png"
              alt="Handy Helpers Logo"
              className="logo"
            />
          </figure>
        </Link>
        <h1 className="header-title">Handy Helpers</h1>

        {isLoggedIn && (
          <nav className="header-nav">
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/repairservices" className="nav-link">Repair Services</Link>
            <Link to="/cleaningservices" className="nav-link">Cleaning Services</Link>
            <button
            onClick={handleLogout}
            className="nav-link logout-button">Logout</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
