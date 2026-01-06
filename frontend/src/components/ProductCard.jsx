import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { arrayUnion, arrayRemove, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useUserPreferences } from "../context/UserPreferencesContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { dispatch: cartDispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { dispatch: prefDispatch, liked, saved } = useUserPreferences();

  const isLiked = liked.includes(product.id);
  const isSaved = saved.includes(product.id);

  const toggleLike = async () => {
    // 1️⃣ Update UI immediately
    prefDispatch({
      type: isLiked ? "REMOVE_LIKE" : "ADD_LIKE",
      payload: product.id,
    });

    // 2️⃣ Persist to Firestore
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        liked: isLiked ? arrayRemove(product.id) : arrayUnion(product.id),
      });
    } catch (err) {
      console.error("Failed to update likes:", err);
      // (optional) rollback here
    }
  };

  const toggleSave = async () => {
    prefDispatch({
      type: isSaved ? "REMOVE_SAVE" : "ADD_SAVE",
      payload: product.id,
    });

    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        saved: isSaved ? arrayRemove(product.id) : arrayUnion(product.id),
      });
    } catch (err) {
      console.error("Failed to update saved:", err);
    }
  };

  const addToCart = () => {
    if (!user) {
      navigate("/signin", {
        state: { from: `/products?focus=${product.id}` },
      });
      return;
    }

    cartDispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__icons">
        <button className={isLiked ? "active" : ""} onClick={toggleLike}>
          ❤️
        </button>

        <button className={isSaved ? "active" : ""} onClick={toggleSave}>
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

      <button className="add-to-cart-btn" onClick={addToCart}>
        🛒 {user ? "Add to cart" : "Sign in to buy"}
      </button>
    </div>
  );
}

export default ProductCard;
