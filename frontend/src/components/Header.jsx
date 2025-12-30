import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header__logo">🌾 GreenFarm</div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav__link">
              About
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav__link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav__link">
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
      <a href="/profile">
        <button className="header__button">Купити зараз</button>
      </a>
      <Link to="/cart" className="cart-icon">
        🛒
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </Link>
    </header>
  );
}

export default Header;
