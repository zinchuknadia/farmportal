import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/CartPage.css";

function CartSummary() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-summary">
      <h3>Order summary</h3>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} ₴</span>
      </div>

      <div className="summary-row">
        <span>Delivery</span>
        <span>Calculated at checkout</span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>{subtotal.toFixed(2)} ₴</span>
      </div>

      <Link to="/checkout" className="checkout-btn">
        Proceed to checkout
      </Link>
    </div>
  );
}

export default CartSummary;
