import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AboutPage.css";

function AboutPage() {
  return (
    <>
      <Header />
      <main className="about">
        <section className="about-content">
          <h1>About Our Farm</h1>
          <p>
            Welcome to Green Valley Farm — a family-owned farm dedicated to
            sustainable agriculture and fresh organic produce. 🌱
          </p>
          <p>
            We believe in environmentally friendly practices, local
            collaboration, and delivering healthy, delicious food directly from
            our fields to your table.
          </p>
          <h2>Our Mission</h2>
          <p>
            To nurture nature while feeding our community — one crop, one
            harvest, and one smile at a time.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
