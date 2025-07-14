import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, isCartReady } = useContext(CartContext);

  // ✅ Prevent early render before cart is loaded from localStorage
  if (!isCartReady) {
    return <div className="text-center mt-5">Loading your cart...</div>;
  }

  console.log("🧺 Cart Items from context:", cartItems);

  const handleRemove = (_id) => {
    removeFromCart(_id);
  };

  const total = cartItems.reduce((acc, item) => {
    const rawPrice = item?.price || "₹0";
    const price = parseInt(rawPrice.replace(/[₹,]/g, ""));
    return acc + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <div>
      <h2 className="mb-4">Your Cart</h2>

      {/* 🧪 Debug output */}
      <pre>{JSON.stringify(cartItems, null, 2)}</pre>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p className="mb-0 text-success">{item.price}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item._id)} // ✅ using _id
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h4 className="text-end">Total: ₹{total.toLocaleString()}</h4>

          <div className="text-end mt-3">
            <Link to="/checkout" className="btn btn-success">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
