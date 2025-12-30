import React, { useState } from "react";
import { useOrders } from "../context/OrdersContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const { orders } = useOrders();

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        if (orders.length === 0) {
          return (
            <div className="tab-content">
              <p>You have no orders yet.</p>
            </div>
          );
        }
  
        return (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span>Order #{order.id.slice(0, 8)}</span>
                  <span className="order-status">{order.status}</span>
                </div>
  
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <span>
                        {item.name} × {item.quantity} {item.unit}
                      </span>
                      <span>
                        {(item.price * item.quantity).toFixed(2)} ₴
                      </span>
                    </div>
                  ))}
                </div>
  
                <div className="order-footer">
                  <span>
                    Delivery date: {order.delivery.date}
                  </span>
                  <strong>Total: {order.total.toFixed(2)} ₴</strong>
                </div>
              </div>
            ))}
          </div>
        );
  
      case "preorders":
        const preorderItems = orders.flatMap(order =>
          order.items.filter(item => item.preorder)
        );
  
        if (preorderItems.length === 0) {
          return (
            <div className="tab-content">
              <p>No scheduled or preorder items.</p>
            </div>
          );
        }
  
        return (
          <div className="orders-list">
            {preorderItems.map(item => (
              <div key={item.id} className="order-card">
                <p>
                  🌱 {item.name} – ready on {item.deliveryDate}
                </p>
              </div>
            ))}
          </div>
        );
  
      case "favorites":
        return (
          <div className="tab-content">
            <p>You haven’t liked any products yet.</p>
          </div>
        );
  
      case "saved":
        return (
          <div className="tab-content">
            <p>No saved products.</p>
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
            <h2>Nadiia Ivanenko</h2>
            <p>Email: nadiia@example.com</p>
            <p>Phone: +380 67 123 45 67</p>
            <p>Delivery address: Lviv region, Ukraine</p>
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
            className={activeTab === "preorders" ? "active" : ""}
            onClick={() => setActiveTab("preorders")}
          >
            Preorders
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
        <div className="profile-tab-box">
          {renderTabContent()}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
