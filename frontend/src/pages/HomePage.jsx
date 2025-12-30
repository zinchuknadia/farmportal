import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import "../styles/index.css";

function HomePage() {
  return (
    <>
      <Header />

      <main className="home">
        <section className="hero">
          <div className="hero__content">
            <h1>Ласкаво просимо до GreenFarm 🌾</h1>
            <p>
              Органічна ферма, де кожен продукт вирощено з любов’ю до природи.  
              Ми дбаємо про здоров’я людей і чистоту навколишнього середовища.
            </p>
            <a href="/about">
              <button className="hero__button">Дізнатися більше</button>
            </a>
          </div>
        </section>

        <section className="about">
          <h2>Про нашу ферму</h2>
          <p>
            GreenFarm — це сімейна ферма, яка спеціалізується на вирощуванні 
            екологічно чистих овочів, фруктів і зелені. Ми використовуємо 
            лише природні добрива та ручну працю, щоб забезпечити найвищу якість.
          </p>
        </section>

        <section className="products-preview">
          <h2>Наша продукція</h2>
          <div className="products__grid">
            <div className="product-card">
              <img src="https://cdn.pixabay.com/photo/2016/11/29/13/14/apples-1868492_1280.jpg" alt="Яблука" />
              <h3>Свіжі яблука</h3>
            </div>
            <div className="product-card">
              <img src="https://cdn.pixabay.com/photo/2016/02/19/11/53/carrots-1203699_1280.jpg" alt="Морква" />
              <h3>Органічна морква</h3>
            </div>
            <div className="product-card">
              <img src="https://cdn.pixabay.com/photo/2017/03/07/19/03/tomatoes-2128745_1280.jpg" alt="Помідори" />
              <h3>Соковиті помідори</h3>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
