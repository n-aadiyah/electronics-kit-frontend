import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const { cartItems, getTotalAmount, clearCart } = useContext(CartContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity || 1,
          })),
          totalAmount: getTotalAmount(),
          shippingInfo: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Order placed successfully!");
      clearCart();
      navigate("/"); // Redirect to home or orders page
    } catch (err) {
      console.error("Order Error:", err);
      alert("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 d-flex justify-content-end gap-2 mt-2">
          <button type="submit" className="btn btn-success">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
