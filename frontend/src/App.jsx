import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { UserPreferencesProvider } from "./context/UserPreferencesContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <UserPreferencesProvider>
          <CartProvider>
            <OrdersProvider>
              <UserProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/LogIn" element={<LogIn />} />
                    <Route path="/user/:id" element={<ProfilePage />} />
                  </Routes>
                </Router>
              </UserProvider>
            </OrdersProvider>
          </CartProvider>
        </UserPreferencesProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
