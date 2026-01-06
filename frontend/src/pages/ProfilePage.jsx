import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useUserPreferences } from "../context/UserPreferencesContext";
import { useProducts } from "../context/ProductsContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const { products, loading: productsLoading } = useProducts();
  const { liked, saved } = useUserPreferences();
  const [activeTab, setActiveTab] = useState("orders");
  const { orders } = useOrders();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  const likedProducts = products.filter((p) => liked.includes(p.id));

  const savedProducts = products.filter((p) => saved.includes(p.id));

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      setProfile((prev) => ({
        ...prev,
        ...formData,
      }));

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  const renderTabContent = () => {
    const now = new Date();

    // Compute a "displayStatus" for each order based on date + status
    const ordersWithDisplayStatus = orders.map((order) => {
      const deliveryDate = new Date(order.delivery.date);
      let displayStatus = order.status;

      // If order is still pending but date has passed, mark as delivered
      if (order.status === "pending" && deliveryDate < now) {
        displayStatus = "delivered";
      }

      return { ...order, displayStatus, deliveryDateObj: deliveryDate };
    });

    // Sort by delivery date ascending
    ordersWithDisplayStatus.sort(
      (a, b) => a.deliveryDateObj - b.deliveryDateObj
    );

    // Split into active and history
    const activeOrders = ordersWithDisplayStatus.filter((o) =>
      ["pending", "processing", "out_for_delivery"].includes(o.displayStatus)
    );

    const historyOrders = ordersWithDisplayStatus.filter((o) =>
      ["delivered", "cancelled"].includes(o.displayStatus)
    );

    switch (activeTab) {
      case "orders": {
        if (orders.length === 0) {
          return (
            <div className="tab-content">
              <p>You have no orders yet.</p>
            </div>
          );
        }

        return (
          <div className="orders-list">
            {/* ACTIVE ORDERS */}
            <h3 className="orders-section-title">Active orders</h3>

            {activeOrders.length === 0 ? (
              <p className="empty-text">No active orders.</p>
            ) : (
              activeOrders.map((order) => (
                <div key={order.id} className="order-card active">
                  <div className="order-header">
                    <span>Order #{order.id.slice(0, 8)}</span>
                    <span className={`order-status ${order.displayStatus}`}>
                      {order.displayStatus}
                    </span>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <span>
                          {item.name} × {item.quantity} {item.unit}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} ₴</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span>Delivery date: {order.delivery.date}</span>
                    <strong>Total: {order.total.toFixed(2)} ₴</strong>
                  </div>
                </div>
              ))
            )}

            {/* ORDER HISTORY */}
            <h3 className="orders-section-title">Order history</h3>

            {historyOrders.length === 0 ? (
              <p className="empty-text">No completed orders yet.</p>
            ) : (
              historyOrders.map((order) => (
                <div key={order.id} className="order-card history">
                  <div className="order-header">
                    <span>Order #{order.id.slice(0, 8)}</span>
                    <span className={`order-status ${order.displayStatus}`}>
                      {order.displayStatus}
                    </span>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <span>
                          {item.name} × {item.quantity} {item.unit}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} ₴</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span>Delivered on: {order.delivery.date}</span>
                    <strong>Total: {order.total.toFixed(2)} ₴</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      }

      // Keep favorites/saved unchanged
      case "favorites":
        if (liked.length === 0)
          return <div className="tab-content">No liked products yet.</div>;
        return (
          <div className="orders-list">
            {likedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products?focus=${product.id}`}
                className="order-card product-link"
              >
                <strong>{product.name}</strong>
                <p>
                  {product.price} ₴ / {product.unit}
                </p>
              </Link>
            ))}
          </div>
        );

      case "saved":
        if (saved.length === 0)
          return <div className="tab-content">No saved products.</div>;
        return (
          <div className="orders-list">
            {savedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products?focus=${product.id}`}
                className="order-card product-link"
              >
                <strong>{product.name}</strong>
                <p>
                  {product.price} ₴ / {product.unit}
                </p>
              </Link>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <div className="profile-page">
        <h1>My Profile</h1>

        {/* Personal info */}
        <div className="profile-info">
          <div className="profile-avatar">👩‍🌾</div>

          <div className="profile-details">
            {loadingProfile ? (
              <p>Loading profile...</p>
            ) : (
              <>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Delivery address"
                      value={formData.address}
                      onChange={handleChange}
                    />

                    <p>Email: {profile.email}</p>

                    <button onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="secondary-btn"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2>{profile.name || "Unnamed user"}</h2>
                    <p>Email: {profile.email}</p>
                    <p>Phone: {profile.phone || "Not provided"}</p>
                    <p>Delivery address: {profile.address || "Not provided"}</p>

                    <button onClick={() => setIsEditing(true)}>
                      Edit profile
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Order history
          </button>
          <button
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => setActiveTab("favorites")}
          >
            Liked products
          </button>
          <button
            className={activeTab === "saved" ? "active" : ""}
            onClick={() => setActiveTab("saved")}
          >
            Saved products
          </button>
        </div>

        {/* Tab content */}
        <div className="profile-tab-box">{renderTabContent()}</div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
