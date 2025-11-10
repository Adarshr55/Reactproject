
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CategoryShowcase() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        const allProducts = res.data;

        // Get unique categories
        const uniqueCategories = [
          ...new Set(allProducts.map((item) => item.category)),
        ];

        // Create sample category cards (you could also use real category images)
        const categoryCards = uniqueCategories.map((cat) => {
          const sampleProduct = allProducts.find(
            (p) => p.category === cat && p.thumbnail
          );
          return {
            name: cat,
            image:
              sampleProduct?.thumbnail ||
              "https://via.placeholder.com/300x300?text=Category",
          };
        });

        setCategories(categoryCards);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-600 font-medium animate-pulse">
        Loading Categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 font-medium">
        No categories found.
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Shop by <span className="text-yellow-500">Category</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/products/${cat.name}`)}
            className="cursor-pointer bg-gray-50 shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-56 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x300?text=No+Image")
              }
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {cat.name}
              </h3>
              <p className="text-yellow-600 text-sm mt-1 font-medium">
                Explore now →
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryShowcase;
