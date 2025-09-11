import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authcontext } from "../../Context/AuthContext";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";


export default function Navbar() {
  const { Token, setToken } = useContext(authcontext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { numfCartItems } = useContext(cartContext);
  const { numfWishlistItems } = useContext(wishlistContext);


  function Out() {
    setToken(null);
    navigate("/login");
    localStorage.removeItem("tok");
    setOpen(false);
  }

  return (
    <>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 w-full z-50 
        bg-gradient-to-r from-white/100 via-[#f5f5f4]/80 to-[#e7e3da]/80
        backdrop-blur-sm border-b border-white/20 shadow-lg transition-all duration-500"
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link to={Token ? "/" : "#"} className="flex items-center gap-2">
            <img src={logo} className="h-9" alt="FreshCart Logo" />
          </Link>

          {/* Desktop Links */}
          {Token && (
            <ul className=" hidden lg:flex items-center gap-8 text-gray-700 font-medium">
              <NavLink to="/home" className="hover:text-green-600 transition">Home</NavLink>
              <NavLink to="/products" className="hover:text-green-600 transition">Products</NavLink>
              <NavLink to="/categories" className="hover:text-green-600 transition">Categories</NavLink>
              <NavLink to="/brandes" className="hover:text-green-600 transition">Brands</NavLink>
              <NavLink to="/allorders" className="hover:text-green-600 transition">Orders</NavLink>
            </ul>
          )}

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {!Token ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-full border border-black text-black hover:bg-green-600 hover:text-white transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-full border border-black text-black hover:bg-green-600 hover:text-white transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className=" flex justify-center items-center gap-6">
                <NavLink to="/cart" className="hover:text-red-600 text-2xl text-gray-700 hover:-translate-y-2 translate duration-300 relative"><GiShoppingCart />
                  {numfCartItems ? <span className="text-red-600 text-sm font-bold   rounded-full px-2 ms-1 absolute -top-3 -start-5 size-5 flex items-center justify-center">{numfCartItems}</span> : ""
                  }
                </NavLink>

                <NavLink to="/wishlist" className="hover:text-red-600 hover:-translate-y-2 text-lg translate duration-300 text-gray-700 relative">  <FaRegHeart />
                  {numfWishlistItems ? <span className="text-red-600 text-sm   rounded-full px-2 ms-1 absolute -top-3 -start-5 font-bold size-5 flex items-center justify-center">{numfWishlistItems}</span> : ""}
                </NavLink>

                <button
                  onClick={Out}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m16 17 5-5-5-5" />
                    <path d="M21 12H9" />
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  </svg>
                </button>

              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200/50"
          >
            {open ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-white/90 backdrop-blur-lg transform transition-all duration-300 ease-in-out ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            } lg:hidden`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-700">Menu</span>
            <button onClick={() => setOpen(false)}>
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col gap-6 p-6 text-gray-700 text-lg font-medium overflow-y-auto h-[calc(100%-4rem)]">

            {Token && (
              <>
                <NavLink to="/home" onClick={() => setOpen(false)} className="hover:text-green-600">Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-green-600">Products</NavLink>
                <NavLink to="/categories" onClick={() => setOpen(false)} className="hover:text-green-600">Categories</NavLink>
                <NavLink to="/brandes" onClick={() => setOpen(false)} className="hover:text-green-600">Brands</NavLink>
                <NavLink to="/allorders" onClick={() => setOpen(false)} className="hover:text-green-600">Orders</NavLink>
                <NavLink to="/cart" onClick={() => setOpen(false)} className="hover:text-red-600 border-t-2 pt-4 border-black flex items-center gap-1" ><GiShoppingCart /> Cart
                  {numfCartItems ? <span className="text-white text-sm font-extralight bg-red-600 rounded-full px-2   ms-1">{numfCartItems}</span> : ""}
                </NavLink>
                <NavLink to="/wishlist" onClick={() => setOpen(false)} className="hover:text-red-600 flex items-center gap-1 ">   <FaRegHeart /> Wishlist
                  {numfWishlistItems ? <span className="text-white text-sm font-extralight bg-red-600 rounded-full px-2   ms-1">{numfWishlistItems}</span> : ""}
                </NavLink>

              </>
            )}
            {!Token ? (
              <>
                <NavLink to="/login" onClick={() => setOpen(false)} className="px-4 py-2 rounded-full border border-gray-700 text-center text-gray-700 hover:bg-green-600 hover:text-white transition ">Login</NavLink>
                <NavLink to="/register" onClick={() => setOpen(false)} className="px-4 py-2 rounded-full border border-gray-700 text-center text-gray-700 hover:bg-green-600 hover:text-white transition">Register</NavLink>
              </>
            ) : (

              <button
                onClick={Out}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>

            )}
          </ul>
        </div>
      </nav>

    </>
  );
}
