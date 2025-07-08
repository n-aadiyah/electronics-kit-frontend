// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text flex-grow-1">{product.description}</p>
          <h6 className="text-success">{product.price}</h6>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>

            {/* ✅ View Details Button */}
            <Link to={`/products/${product.id}`} className="btn btn-outline-secondary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
