import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AboutPage.css";
import "../styles/index.css";

function AboutPage() {
  return (
    <>
      <Header />

      <main className="about">
        {/* HERO */}
        <section className="about-hero">
          <h1>About Green Valley Farm</h1>
          <p>
            Sustainable farming. Honest food. A healthier future. 🌱
          </p>
        </section>

        {/* STORY */}
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Green Valley Farm is a family-owned farm that started with a simple
            idea — grow food the right way. We believe that nature gives back
            when treated with care, patience, and respect.
          </p>
          <p>
            What began as a small local farm has grown into a trusted source of
            fresh vegetables, fruits, dairy, and handcrafted farm products.
          </p>
        </section>

        {/* PROCESS */}
        <section className="about-section light">
          <h2>How We Farm</h2>
          <div className="process-grid">
            <div className="process-card">
              <h3>🌿 Organic Growing</h3>
              <p>No chemicals, no shortcuts — only natural methods.</p>
            </div>
            <div className="process-card">
              <h3>🚜 Ethical Farming</h3>
              <p>Respect for animals, soil, and local ecosystems.</p>
            </div>
            <div className="process-card">
              <h3>📦 Fresh Delivery</h3>
              <p>From our fields straight to your home.</p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="avatar"></div>
              <h4>Anna Green</h4>
              <span>Farm Founder</span>
            </div>
            <div className="team-card">
              <div className="avatar"></div>
              <h4>Mark Valley</h4>
              <span>Field Manager</span>
            </div>
            <div className="team-card">
              <div className="avatar"></div>
              <h4>Sophia Bloom</h4>
              <span>Quality Control</span>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="about-section light">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li>🌱 Sustainability first</li>
            <li>🤝 Support local communities</li>
            <li>🍎 Healthy food without compromise</li>
            <li>♻️ Minimal waste, maximum care</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutPage;
