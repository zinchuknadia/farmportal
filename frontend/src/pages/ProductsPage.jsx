import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import "../styles/ProductsPage.css";
import "../styles/index.css";

function ProductsPage() {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", marginTop: 40 }}>
          Loading products...
        </p>
        <Footer />
      </>
    );
  }

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
