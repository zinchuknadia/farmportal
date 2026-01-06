import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import "../styles/Header.css";

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();

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

      <div className="header__actions">
        {!user ? (
          <>
            <Link to="/signin" className="nav__link">
              Sign in
            </Link>
            <Link to="/signup">
              <button className="header__button">Sign up</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="cart-icon">
              🛒
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>

            <div className="profile-menu">
              <Link to="/profile" className="profile-icon">
                {user.avatar ? <img src={user.avatar} alt="profile" /> : "👩‍🌾"}
              </Link>

              <button
                className="logout-btn"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
