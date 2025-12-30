import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/CartPage.css";

function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="cart-item">
      <img
        src={item.image || "/images/placeholder.png"}
        alt={item.name}
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <h3>{item.name}</h3>
        <p>{item.price} ₴ / {item.unit}</p>

        {item.preorder && (
          <p className="preorder-label">
            🌱 Preorder {item.deliveryDate && `– ${item.deliveryDate}`}
          </p>
        )}
      </div>

      <div className="cart-item__controls">
        <button
          onClick={() =>
            dispatch({
              type: "UPDATE_QTY",
              payload: { id: item.id, quantity: item.quantity - 1 }
            })
          }
          disabled={item.quantity <= 1}
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() =>
            dispatch({
              type: "UPDATE_QTY",
              payload: { id: item.id, quantity: item.quantity + 1 }
            })
          }
        >
          +
        </button>
      </div>

      <div className="cart-item__price">
        {(item.price * item.quantity).toFixed(2)} ₴
      </div>

      <button
        className="cart-item__remove"
        onClick={() =>
          dispatch({ type: "REMOVE_ITEM", payload: item.id })
        }
      >
        ✕
      </button>
    </div>
  );
}

export default CartItem;
