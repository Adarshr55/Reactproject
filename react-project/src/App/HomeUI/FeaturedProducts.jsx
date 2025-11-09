import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");

        // Sort by rating (highest first) or any other logic you prefer
        const sorted = res.data.sort((a, b) => b.rating - a.rating);

        // Take only top 4
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

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-600 font-medium animate-pulse">
        Loading Featured Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 font-medium">
        No featured products available right now.
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Our <span className="text-yellow-500">Best Sellers</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
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
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-yellow-600 font-semibold mt-2">
                ${product.price}
              </p>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 transition"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
