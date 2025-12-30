import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../context/CartContext";
import "../styles/CartPage.css";
import "../styles/index.css";

function CartPage() {
  const { cart } = useCart();

  return (
    <>
      <Header />

      <div className="cart-page">
        <h1>Your cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty 🌾</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <CartSummary />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CartPage;
