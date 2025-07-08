// src/pages/ProductDetail.js
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

// Dummy product list (you can move this to a separate file if needed)
const products = [
  {
    id: 1,
    name: "Arduino Starter Kit",
    price: "₹999",
    description: "Beginner-friendly kit with Arduino UNO, jumper wires, LEDs, and sensors.",
  },
  {
    id: 2,
    name: "Raspberry Pi Kit",
    price: "₹3,499",
    description: "Complete Raspberry Pi 4 kit for IoT and programming projects.",
  },
  {
    id: 3,
    name: "Robotics Kit",
    price: "₹1,799",
    description: "Build your own robot car with this motor driver and sensor kit.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h4>Product not found</h4>;
  }

  return (
    <div className="container">
      <h2 className="my-4">{product.name}</h2>
      <p>{product.description}</p>
      <h4 className="text-success">{product.price}</h4>
      <button className="btn btn-primary me-3" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default ProductDetail;
