import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p><Link to='/about-us'>About us</Link></p>
        <p><Link to='/contact'>Contact</Link></p>
        <p><Link to='/FAQ'>FAQ</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
