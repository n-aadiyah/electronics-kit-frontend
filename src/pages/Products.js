import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Available Kits</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={product._id}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
