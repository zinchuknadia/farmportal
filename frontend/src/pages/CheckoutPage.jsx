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
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

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

    const newErrors = [];

    if (!form.name) newErrors.push("Please enter your full name");
    if (!form.phone) newErrors.push("Please enter a phone number");
    if (!form.deliveryDate) newErrors.push("Please select a delivery date");
    if (form.deliveryType === "delivery" && !form.address) {
      newErrors.push("Please provide a delivery address");
    }

    if (!user) newErrors.push("Please log in to place an order");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]); // clear old errors

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
      setSuccess("Your order has been placed successfully! 🌱");
      setErrors([]);

      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);
    } catch (err) {
      console.error("Failed to save order:", err);
      setErrors(["Failed to place order"]);
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

            {success && <div className="success-box">{success}</div>}
            {errors.length > 0 && (
              <div className="error-box">
                {errors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

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
