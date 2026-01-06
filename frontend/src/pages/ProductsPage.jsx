import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import "../styles/ProductsPage.css";
import "../styles/index.css";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get("focus");
  const productRefs = useRef({});

  const { products, loading } = useProducts();

  useEffect(() => {
    if (!focusId || !productRefs.current[focusId]) return;

    const el = productRefs.current[focusId];

    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    el.classList.add("highlight-product");

    const timeout = setTimeout(() => {
      el.classList.remove("highlight-product");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [focusId, products]);

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
          {products.map((product) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[product.id] = el)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductsPage;
