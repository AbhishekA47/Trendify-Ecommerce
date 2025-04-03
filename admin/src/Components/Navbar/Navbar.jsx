import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import navProfile from '../../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="nav-logo" />
        <h1>Trendify</h1>
      </div>
      <div className="navbar-center">
        <b>ADMIN PANEL</b>
      </div>
      <div className="navbar-right">
        <img src={navProfile} alt="Profile" className="nav-profile" />
      </div>
    </div>
  );
};

export default Navbar;

