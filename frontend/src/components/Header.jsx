import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">🌾 GreenFarm</div>
      <nav className="header__nav">
        <ul>
          <li><Link to="/" className="nav__link">Home</Link></li>
          <li><Link to="/about" className="nav__link">About</Link></li>
          <li><Link to="/products" className="nav__link">Products</Link></li>
          <li><Link to="/contact" className="nav__link">Contacts</Link></li>
        </ul>
      </nav>
      <button className="header__button">Купити зараз</button>
    </header>
  );
}

export default Header;
