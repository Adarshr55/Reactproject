import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContest } from "../../User-Auth/Authcontest";
import axios from "axios";
import API from "../../services/api" 
import toast from "react-hot-toast";

export const WishListContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user,isloggedin} = useContext(AuthContest);
  const [wishlist, setWishlist] = useState([]);

  // Sync wishlist when user logs in/out
  useEffect(() => {
    const loadWishlist=async ()=>{
      if(!isloggedin || !user){
        setWishlist([])
        return
      }
      try{
        const res = await API.get('/wishlist/')
                setWishlist(res.data || [])
      }catch (err) {
        console.error("Error loading wishlist", err)
      }
    }
    loadWishlist()
   
  }, [user,isloggedin]);

  // Update backend + local state
  // const updateWishlist = async (updatedList) => {
  //   try {
  //     await axios.patch(`http://localhost:5000/users/${user.id}`, {
  //       wishlist: updatedList,
  //     });

  //     setWishlist(updatedList);

  //     const updatedUser = { ...user, wishlist: updatedList };
  //     localStorage.setItem("user", JSON.stringify(updatedUser));
  //   } catch (err) {
  //     console.error("Wishlist update error:", err);
  //     toast.error("Failed to update wishlist");
  //   }
  // };

  const addToWishlist = async (product) => {
    if (!user) return toast.error("Please login");

    if (wishlist.some((item) => item.product.id === product.id)){
      return toast("Already in wishlist");
    }
    try{
      const res=await API.post('/wishlist/add/',{ product_id: product.id})
      setWishlist(prev => [...prev, res.data])
      toast.success("Added to wishlist")
    }catch(err){
      console.error("Error adding to wishlist", err)
      toast.error("Failed to add to wishlist")
    }

    // const updatedList = [...wishlist, product];
    // await updateWishlist(updatedList);
    // toast.success("Added to wishlist ");
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
     setWishlist(prev => prev.filter(item => item.product.id !== productId))

     try {
         await API.delete(`/wishlist/${productId}/`)
         toast.success("Removed from wishlist")
     }catch (err){
      console.error("Error removing from wishlist", err)
            toast.error("Failed to remove")
            const res = await API.get('/wishlist/')
            setWishlist(res.data || [])
     }
    // const updatedList = wishlist.filter((item) => item.id !== id);
    // await updateWishlist(updatedList);
    // toast.success("Removed ");
  };
    const isWishlisted = (productId) =>
        wishlist.some(item => item.product?.id === productId)

  return (
    <WishListContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishListContext.Provider>
  );
};
