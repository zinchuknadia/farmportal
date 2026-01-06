import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* ABOUT */}
        <div className="footer__about">
          <h3>🌾 GreenFarm</h3>
          <p>
            We grow organic products with love and respect for nature.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="footer__links">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* CONTACT */}
        <div className="footer__contact">
          <h4>Contact</h4>
          <p>📞 +380 67 123 45 67</p>
          <p>📧 info@greenfarm.ua</p>
          <p>📍 Lviv Region, Ukraine</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} GreenFarm. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
