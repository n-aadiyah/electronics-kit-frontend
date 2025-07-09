// src/pages/Products.js
import React from "react";
import ProductCard from "../components/ProductCard";

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

const Products = () => {
  return (
    <div>
      <h2 className="mb-4">Available Kits</h2>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
