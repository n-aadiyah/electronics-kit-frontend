// src/pages/ProductDetail.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setProduct(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setError(true);
      });
  }, [id]);

  const alreadyInCart = cartItems.some((item) => item._id === product?._id);

  if (error) return <h4>Product not found</h4>;
  if (!product) return <p>Loading...</p>;

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <div className="container">
      <h2 className="my-4">{product.name}</h2>
      <p>{product.description}</p>
      <h4 className="text-success">₹{product.price}</h4>

      <button
        className="btn btn-primary me-3"
        onClick={handleAdd}
        disabled={alreadyInCart}
      >
        {alreadyInCart ? "Added to Cart" : "Add to Cart"}
      </button>

      <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default ProductDetail;
