import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
        console.log("📦 Cart loaded:", JSON.parse(stored));
      } catch (err) {
        console.error("❌ JSON parse error:", err);
      }
    }
    setIsCartReady(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isCartReady) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isCartReady]);

  // ✅ Add to cart (no duplicates)
  const addToCart = (product) => {
    const alreadyInCart = cartItems.some((item) => item._id === product._id);
    if (!alreadyInCart) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  // ✅ Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Calculate total amount
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalAmount,
        isCartReady,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
