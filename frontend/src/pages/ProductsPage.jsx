import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/ProductsPage.css";
import "../styles/index.css";

function ProductsPage() {
  return (
    <>
      <Header />

      <div className="products">
        <h1 className="products__title">Our Products</h1>

        <div className="products__grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductsPage;
