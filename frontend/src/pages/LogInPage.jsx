import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

import Header from "../components/Header";
import "../styles/LoginSignup.css";

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Wrong password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <div className="form-box">
          <h2>Login</h2>
          <p>Log in to your account</p>

          {error && <p className="error-text">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>

          <p className="switch-link">
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LogIn;
