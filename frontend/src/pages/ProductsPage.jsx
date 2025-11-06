import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ProductsPage.css";

function ProductsPage() {
  const products = [
    { id: 1, name: "Organic Honey", price: "$12", description: "Pure, raw, local honey." },
    { id: 2, name: "Fresh Eggs", price: "$6 / dozen", description: "Free-range chicken eggs." },
    { id: 3, name: "Goat Milk Soap", price: "$8", description: "Natural soap made from goat milk." },
  ];

  return (
    <>
      <Header />

      <div className="products">
      <h1 className="products__title">Our Products</h1>
        <div className="products__grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span className="product__price">{product.price}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductsPage;
