import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Welcome to Electronics Kit Store</h1>
          <p className="lead">
            Buy beginner-friendly electronic kits and start building today!
          </p>
          <Link to="/products" className="btn btn-light btn-lg mt-3">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h4 className="mb-3">Easy to Use</h4>
            <p>Our kits are designed for beginners and hobbyists.</p>
          </div>
          <div className="col-md-4">
            <h4 className="mb-3">Affordable</h4>
            <p>Best price guaranteed on all starter and advanced kits.</p>
          </div>
          <div className="col-md-4">
            <h4 className="mb-3">Fast Delivery</h4>
            <p>Get your kits delivered anywhere in India within 3–5 days.</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-primary text-white text-center py-4">
        <div className="container">
          <h4>Ready to Build Your First Project?</h4>
          <Link to="/products" className="btn btn-light mt-2">
            Browse Kits
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
