import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">🌾 GreenFarm</div>
      <nav className="header__nav">
        <a href="/" className="nav__link">Головна</a>
        <a href="/about" className="nav__link">Про нас</a>
        <a href="/products" className="nav__link">Продукція</a>
        <a href="/contact" className="nav__link">Контакти</a>
      </nav>
      <button className="header__button">Купити зараз</button>
    </header>
  );
}

export default Header;
