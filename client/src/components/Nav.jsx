import { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(Auth.loggedIn());
    };

    // Listen for any event or recheck the login status
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false); // Update login status on logout
  };

  const showNavigation = () => {
    if (isLoggedIn) {
      return (
        <ul className="navbar">
          <li className="navbar-link">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="navbar-link">
            <Link to="/job-center">Job Center</Link>
          </li>
          <li className="navbar-link">
            <Link to="/cleaning-services">Cleaning Services</Link>
          </li>
          <li className="navbar-link">
            <Link to="/repair-services">Repair Services</Link>
          </li>
          <li className="navbar-link">
            <Link to="/landscape-services">Landscaping Services</Link>
          </li>
          <li className="navbar-link">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      );
    }
  };

  return <nav>{showNavigation()}</nav>;
};

export default Nav;
