import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import "../styles/CheckoutPage.css";
import "../styles/index.css";

function CheckoutPage() {
  const { user } = useAuth();
  const { cart, dispatch: cartDispatch } = useCart();
  const { dispatch: ordersDispatch } = useOrders();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryType: "pickup",
    address: "",
    deliveryDate: "",
    comment: "",
  });

  useEffect(() => {
    if (!user) return;

    const loadUserProfile = async () => {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setForm((prev) => ({
            ...prev,
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || user.email || "",
            address: data.address || "",
          }));
        } else {
          // fallback if user doc doesn't exist yet
          setForm((prev) => ({
            ...prev,
            email: user.email || "",
          }));
        }
      } catch (err) {
        console.error("Failed to load user data:", err);
      }
    };

    loadUserProfile();
  }, [user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to place an order");
      return;
    }

    if (!form.name || !form.phone || !form.deliveryDate) {
      alert("Please fill all required fields");
      return;
    }

    const order = {
      userId: user.uid,
      createdAt: serverTimestamp(),
      status: "pending",
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
      },
      delivery: {
        type: form.deliveryType,
        address: form.deliveryType === "delivery" ? form.address : null,
        date: form.deliveryDate,
      },
      items: cart,
      total: subtotal,
    };

    try {
      await addDoc(collection(db, "orders"), order);

      cartDispatch({ type: "CLEAR_CART" });
      alert("Order confirmed 🌱");
      window.location.href = "/profile";
    } catch (err) {
      console.error("Failed to save order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <Header />

      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-layout">
          {/* FORM */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Your details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full name *"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number *"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <h2>Delivery</h2>

            <select
              name="deliveryType"
              value={form.deliveryType}
              onChange={handleChange}
            >
              <option value="pickup">Farm pickup</option>
              <option value="delivery">Home delivery</option>
            </select>

            {form.deliveryType === "delivery" && (
              <input
                type="text"
                name="address"
                placeholder="Delivery address *"
                value={form.address}
                onChange={handleChange}
              />
            )}

            <input
              type="date"
              name="deliveryDate"
              value={form.deliveryDate}
              onChange={handleChange}
            />

            <textarea
              name="comment"
              placeholder="Comment to farmer"
              rows="4"
              value={form.comment}
              onChange={handleChange}
            />

            <button type="submit" className="confirm-btn">
              Confirm order
            </button>
          </form>

          {/* SUMMARY */}
          <div className="checkout-summary">
            <h3>Your order</h3>

            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toFixed(2)} ₴</span>
              </div>
            ))}

            <div className="summary-total">
              <span>Total</span>
              <span>{subtotal.toFixed(2)} ₴</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CheckoutPage;
