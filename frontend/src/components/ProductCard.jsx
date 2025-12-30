import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        quantity: 1
      }
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__icons">
        <button
          className={liked ? "active" : ""}
          onClick={() => setLiked(!liked)}
          title="Like"
        >
          ❤️
        </button>
        <button
          className={saved ? "active" : ""}
          onClick={() => setSaved(!saved)}
          title="Save"
        >
          🔖
        </button>
      </div>

      <img
        src={product.image || "/images/placeholder.png"}
        alt={product.name}
        className="product-card__image"
      />

      <h2>{product.name}</h2>
      <p>{product.description}</p>

      {product.preorder && (
        <span className="preorder-badge">
          🌱 Available from {product.availableFrom}
        </span>
      )}

      <span className="product__price">
        {product.price} ₴ / {product.unit}
      </span>

      <button
        className="add-to-cart-btn"
        onClick={addToCart}
      >
        🛒 Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
