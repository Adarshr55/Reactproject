import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContest } from "../../User-Auth/Authcontest";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContest);
  const [wishlist, setWishlist] = useState([]);

  // Sync wishlist when user logs in/out
  useEffect(() => {
    if (user && user.wishlist) {
      setWishlist(user.wishlist);
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Update backend + local state
  const updateWishlist = async (updatedList) => {
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedList,
      });

      setWishlist(updatedList);

      const updatedUser = { ...user, wishlist: updatedList };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Wishlist update error:", err);
      toast.error("Failed to update wishlist");
    }
  };

  const addToWishlist = async (product) => {
    if (!user) return toast.error("Please login");

    if (wishlist.some((item) => item.id === product.id))
      return toast("Already in wishlist");

    const updatedList = [...wishlist, product];
    await updateWishlist(updatedList);
    toast.success("Added to wishlist ");
  };

  const removeFromWishlist = async (id) => {
    if (!user) return;

    const updatedList = wishlist.filter((item) => item.id !== id);
    await updateWishlist(updatedList);
    toast.success("Removed ");
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishListContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishListContext.Provider>
  );
};
