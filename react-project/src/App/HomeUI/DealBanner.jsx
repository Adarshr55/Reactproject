
import React from "react";
import { useNavigate } from "react-router-dom";

function DealBanner() {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-16 px-6 md:px-16 overflow-hidden text-center text-gray-900"
      style={{
        background: "linear-gradient(to right, #fff8dc, #fff5b1)", // soft yellow gradient
      }}
    >
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-4">
          Limited Time <span className="text-yellow-600">Offer</span>!
        </h2>

        <p className="text-gray-700 mb-6 text-lg">
          Get up to <span className="text-yellow-600 font-bold">40% OFF</span> on selected styles.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default DealBanner;
