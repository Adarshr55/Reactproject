import React, { useContext } from "react";
import { WishListContext } from "./WishlistContext";
import { CartContest } from "../Cartcomponent/CartContest";
import { AuthContest } from "../../User-Auth/Authcontest";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function WishList() {
  const { wishlist, removeFromWishlist } = useContext(WishListContext);
  const { addToCart } = useContext(CartContest);
  const { isloggedin } = useContext(AuthContest);

  if (wishlist.length === 0) {
    return (
      <section className="pt-24 text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-700">No items in Wishlist </h2>
        <Link
          to="/products"
          className="inline-block mt-5 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="pt-24 px-6 md:px-14">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Wishlist </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.name}
                className="h-48 w-full object-cover rounded-md"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x300?text=Image+Unavailable")
                }
              />
            </Link>

            <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 mb-2">${item.price}</p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
              >
                Remove
              </button>

              <button
                onClick={() => {
                  if (!isloggedin) {
                    toast.error("Please login first");
                    return;
                  }
                  addToCart(item);
                  toast.success("Moved to Cart");
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              >
                Add Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WishList;
