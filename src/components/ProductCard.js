import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  // ✅ Check if the product is already in the cart using _id
  const alreadyInCart = cartItems.some((item) => item._id === product._id);

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <div className="card h-100 shadow-sm">
      {/* Optional product image */}
      {product.image && (
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {product.description?.slice(0, 80)}...
        </p>
        <h6 className="text-success fw-bold">₹{product.price}</h6>

        <div className="mt-auto d-flex justify-content-between gap-2">
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={alreadyInCart}
          >
            {alreadyInCart ? "Added to Cart" : "Add to Cart"}
          </button>
          <Link
            to={`/products/${product._id}`}
            className="btn btn-outline-secondary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
