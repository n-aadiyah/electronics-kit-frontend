// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";  // ✅ no BrowserRouter here
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <main className="container my-4">
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </main>
  );
};

export default App;
