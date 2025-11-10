import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RatingStar from "../RatingStar"; // ✅ optional (add only if you already have it)

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");

        // 🔥 Sort products by rating or popularity (top-rated first)
        const sorted = res.data.sort((a, b) => b.rating - a.rating);

        // 🎯 Take only the top 4
        setProducts(sorted.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products");
        toast.error("Error loading featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // 🌀 Loading state
  if (loading) {
    return (
      <div className="py-16 text-center text-gray-600 font-medium animate-pulse">
        Loading Featured Products...
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="py-16 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  // 🫥 No products fallback
  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 font-medium">
        No featured products available right now.
      </div>
    );
  }

  // ✅ Main Render
  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Our <span className="text-yellow-500">Best Sellers</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-64 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x300?text=Image+Unavailable")
              }
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h3>

              {/* ⭐ Optional rating display */}
              {product.rating && (
                <div className="flex justify-center my-2">
                  <RatingStar rating={product.rating} size={18} />
                </div>
              )}

              <p className="text-yellow-600 font-semibold mt-2">
                ${product.price}
              </p>

              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 👇 "View All" Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/products")}
          className="bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
        >
          View All Products
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
