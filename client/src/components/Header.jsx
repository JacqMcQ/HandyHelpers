import React from "react";
import { Link } from "react-router-dom";
import logo from "/images/HHLogo.png";
import Auth from "../utils/auth";

const Header = () => {
  // if user is logged in, get username
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <figure className="image is-64x64">
            <img
              src={logo}
              alt="Handy Helpers Logo"
              className="logo"
            />
          </figure>
        </Link>
   <h1 className="header-title">Handy Helpers</h1>
        {/* Greet user if logged in */}
        {username && <p className="header-greeting">Welcome, {username}!</p>}
        <p className="header-tagline">
          Your go-to solution for every task, big or small!
        </p>
      </div>
    </header>
  );
};

export default Header;
