import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUserPreferences } from "../context/UserPreferencesContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { dispatch: cartDispatch } = useCart();
  const {
    dispatch: prefDispatch,
    liked,
    saved
  } = useUserPreferences();

  const isLiked = liked.some(p => p.id === product.id);
  const isSaved = saved.some(p => p.id === product.id);

  const addToCart = () => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        quantity: 1,
      },
    });
  };

  return (
     <div className="product-card">
      <div className="product-card__icons">
      <button
        className={isLiked ? "active" : ""}
        onClick={() =>
          prefDispatch({
            type: isLiked ? "REMOVE_LIKE" : "ADD_LIKE",
            payload: isLiked ? product.id : product
          })
        }
      >
        ❤️
      </button>

      <button
        className={isSaved ? "active" : ""}
        onClick={() =>
          prefDispatch({
            type: isSaved ? "REMOVE_SAVE" : "ADD_SAVE",
            payload: isSaved ? product.id : product
          })
        }
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
