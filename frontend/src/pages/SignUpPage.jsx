import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/LoginSignup.css";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: "",
        email: user.email,
        phone: "",
        address: "",
        createdAt: new Date(),
      });
      
      alert("Welcome! You have successfully signed up.");
      navigate("/profile");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
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
          <h2>Sign Up</h2>
          <p>Create a new account</p>

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

          <button onClick={signUp}>Sign Up</button>

          <p className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
