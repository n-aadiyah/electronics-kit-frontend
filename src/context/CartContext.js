import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false); // ✅

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
        console.log("📦 Cart loaded:", JSON.parse(stored));
      } catch (err) {
        console.error("❌ JSON error", err);
      }
    }
    setIsCartReady(true); // ✅ Mark done
  }, []);

  useEffect(() => {
    if (isCartReady) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isCartReady]);

  const addToCart = (product) => {
    const alreadyInCart = cartItems.some((item) => item._id === product._id);
    if (!alreadyInCart) {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartReady }}>
      {children}
    </CartContext.Provider>
  );
};
