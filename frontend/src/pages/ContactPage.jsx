import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ContactPage.css";
import "../styles/index.css";

function ContactPage() {
  return (
    <>
      <Header />

      <div className="contact-page">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          We'd love to hear from you! Reach out for any questions, orders, or farm visits.
        </p>

        <div className="contact-info">
          <div className="contact-item">
            <h3>📍 Address</h3>
            <p>Sunny Farm, Green Valley, Ukraine</p>
          </div>

          <div className="contact-item">
            <h3>📞 Phone</h3>
            <p>+380 67 123 4567</p>
          </div>

          <div className="contact-item">
            <h3>📧 Email</h3>
            <p>hello@sunnyfarm.com</p>
          </div>
        </div>

        <form className="contact-form">
          <h2>Send us a message</h2>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
