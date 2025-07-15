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

  // ✅ Default images per category
  const defaultImages = {
    Electronics: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
    Books: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    Toys: "https://static.vecteezy.com/system/resources/thumbnails/020/374/441/small/toy-car-icon-illustration-png.png",
  };

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

  if (error) return <h4 className="text-center mt-5">❌ Product not found</h4>;
  if (!product) return <p className="text-center mt-5">⏳ Loading...</p>;

  const handleAdd = () => {
    addToCart(product);
  };

  // ✅ Supports public folder images + external URLs + category fallback
  const productImage = product.image?.startsWith("http")
    ? product.image
    : product.image
    ? `${process.env.PUBLIC_URL}${product.image}`
    : defaultImages[product.category] || "https://via.placeholder.com/400x300";

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow text-center">
            {/* ✅ Product Image */}
            <img
              src={productImage}
              alt={product.name}
              className="img-fluid mb-4"
              style={{ maxHeight: "250px", objectFit: "contain" }}
            />

            {/* ✅ Product Info */}
            <h2 className="mb-2">{product.name}</h2>
            <p>{product.description}</p>
            <h4 className="text-success mb-4">₹{product.price}</h4>

            {/* ✅ Buttons */}
<div className="d-flex flex-column align-items-center gap-2 mt-3">
  <div className="d-flex gap-3">
    <button
      className="btn btn-primary"
      onClick={handleAdd}
      disabled={alreadyInCart}
    >
      {alreadyInCart ? "✔ Added to Cart" : "🛒 Add to Cart"}
    </button>

    <button
      className="btn btn-outline-secondary"
      onClick={() => navigate(-1)}
    >
      🔙 Go Back
    </button>
  </div>

  <button
    className="btn btn-outline-success"
    onClick={() => navigate("/cart")}
  >
    🛒 Go to Cart
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
