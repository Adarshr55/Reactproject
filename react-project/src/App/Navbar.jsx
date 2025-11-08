import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, LogIn, LogOut, User, Menu, X } from "lucide-react";
import { AuthContest } from "../User-Auth/Authcontest";
import { CartContest } from "./Cartcomponent/CartContest";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout, isloggedin } = useContext(AuthContest);
  const { totalItems,cart} = useContext(CartContest);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between h-16 px-6 md:px-12">

        <Link
          to="/"
          className="relative text-3xl font-extrabold tracking-wide text-black transition duration-300 group"
        >
          Stride<span className="text-yellow-500">Lux</span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
        </Link>

    
        <div className="hidden md:flex space-x-8 text-gray-800 font-semibold">
          {["men", "women", "kids", "sports"].map((category) => (
            <NavLink
              key={category}
              to={`/products/${category}`}
              className={({ isActive }) =>
                `hover:text-yellow-500 transition duration-200 ${
                  isActive ? "text-yellow-500" : ""
                }`
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-6">

          <Link
            to="/cart"
            className="relative text-gray-800 hover:text-yellow-500 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-1.5">
                {cart.length}
              </span>
            )}
          </Link>

    
          {isloggedin && (
            <button
              onClick={() => handleLinkClick("/myorder")}
              className="hidden md:flex items-center gap-1 text-gray-800 hover:text-yellow-500 transition"
            >
              <span className="font-semibold">My Orders</span>
            </button>
          )}

          {!isloggedin ? (
            <button
              onClick={() => handleLinkClick("/login")}
              className="hidden md:flex items-center gap-1 text-gray-800 hover:text-yellow-500 transition"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-semibold">Login</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <User className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-800 capitalize">
                {user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-800 hover:text-yellow-500 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          )}


          <button
            className="md:hidden text-gray-800 hover:text-yellow-500 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      
      <div
        className={`md:hidden fixed top-16 left-0 w-3/4 h-full bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 p-6 text-gray-800 font-semibold">
          {["men", "women", "kids", "sports"].map((category) => (
            <button
              key={category}
              onClick={() => handleLinkClick(`/products/${category}`)}
              className="text-left hover:text-yellow-500 transition"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}

          {isloggedin && (
            <button
              onClick={() => handleLinkClick("/myorder")}
              className="text-left hover:text-yellow-500 transition"
            >
              My Orders
            </button>
          )}

          {!isloggedin ? (
            <button
              onClick={() => handleLinkClick("/login")}
              className="text-left hover:text-yellow-500 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left hover:text-yellow-500 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
