import Auth from "../utils/auth"; // Assuming Auth is your authentication utility
import { Link } from "react-router-dom"; // For navigation links

const Nav = () => {
  // Function to conditionally render navigation based on login status
  const showNavigation = () => {
    if (Auth.loggedIn()) {
      // Show navigation for logged-in users
      return (
        <ul className="navbar">
          <li className="navbar-link">
            <Link to="/"></Link>
          </li>
          <li className="navbar-link">
            <Link to="/"></Link>
          </li>
          <li className="navbar-link">
            <Link to="/"></Link>
          </li>
          <li className="navbar-link">
            <a href="/" onClick={() => Auth.logout()}>
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