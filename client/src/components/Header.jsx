import React from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
