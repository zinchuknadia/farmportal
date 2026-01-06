import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import "../styles/HomePage.css";
import "../styles/index.css";

function HomePage() {
  const { products, loading } = useProducts();

  const previewProducts = products.slice(0, 4);

  return (
    <>
      <Header />

      <main className="home">
        {/* HERO */}
        <section className="hero">
          <div className="hero__content">
            <h1>Welcome to GreenFarm 🌾</h1>
            <p>
              An organic farm where every product is grown with love for nature.
              We care about people’s health and the environment.
            </p>
            <Link to="/about" className="hero__button">
              Learn more
            </Link>
          </div>
        </section>

        {/* ABOUT PREVIEW */}
        <section className="about">
          <h2>About Our Farm</h2>
          <p>
            GreenFarm is a family-owned farm specializing in organic vegetables,
            fruits, and greens. We use natural fertilizers and careful handwork
            to deliver the highest quality products.
          </p>
        </section>

        <section className="benefits">
          <h2>Why Choose GreenFarm?</h2>

          <div className="benefits__grid">
            <div className="benefit-card">
              <span>🌱</span>
              <h3>100% Organic</h3>
              <p>No chemicals, only natural farming methods.</p>
            </div>

            <div className="benefit-card">
              <span>🚜</span>
              <h3>Local Farm</h3>
              <p>Grown locally and delivered fresh.</p>
            </div>

            <div className="benefit-card">
              <span>🤝</span>
              <h3>Fair & Ethical</h3>
              <p>Respect for people, animals, and nature.</p>
            </div>
          </div>
        </section>

        {/* PRODUCTS PREVIEW */}
        <section className="products-preview">
          <h2>Our Products</h2>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products__grid">
              {previewProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>

          <div className="steps">
            <div className="step">
              <span>1</span>
              <p>Choose fresh farm products</p>
            </div>
            <div className="step">
              <span>2</span>
              <p>Place your order online</p>
            </div>
            <div className="step">
              <span>3</span>
              <p>We harvest & deliver to you</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to taste real farm food?</h2>
          <p>Browse our products and order fresh, organic food today.</p>
          <Link to="/products" className="cta__button">
            Shop now
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
