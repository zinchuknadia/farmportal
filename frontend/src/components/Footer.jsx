import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__about">
          <h3>🌾 GreenFarm</h3>
          <p>Ми вирощуємо органічну продукцію з любов’ю до природи.</p>
        </div>
        <div className="footer__links">
          <h4>Навігація</h4>
          <a href="/">Головна</a>
          <a href="/about">Про нас</a>
          <a href="/products">Продукція</a>
          <a href="/contact">Контакти</a>
        </div>
        <div className="footer__contact">
          <h4>Контакти</h4>
          <p>📞 +380 67 123 45 67</p>
          <p>📧 info@greenfarm.ua</p>
          <p>📍 Львівська область, Україна</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} GreenFarm. Усі права захищено.</p>
      </div>
    </footer>
  );
}

export default Footer;
