import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../brand_nudge_logo.png';

const Navbar = () => {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{ width: '100px', margin: '20px auto', display: 'block' }}
      />
      <div className="center_nav">
        <Link to="/products" className="link">
          PRODUCTS
        </Link>
        <Link to="/compare" className="link">
          COMPARE PRICES
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
