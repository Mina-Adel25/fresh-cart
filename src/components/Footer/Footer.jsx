import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "../../Context/AuthContext";
import logo from "../../assets/images/freshcart-logo.svg";
export default function Footer() {
    const { Token} = useContext(authcontext);
  return (
    <footer className="relative bg-gradient-to-r from-[#f7f7f7]/95 via-[#f0f0f0]/90 to-[#e8e8e8]/95 backdrop-blur-2xl shadow-md border-t border-gray-200 mt-16">
      <div className={`max-w-screen-xl mx-auto px-6 py-8 grid grid-cols-1 ${Token? "md:grid-cols-3": "md:grid-cols-2"} gap-6`}>
        
        {/* Brand */}
        <div>
          <img src={logo} className="h-9" alt="FreshCart Logo" />
          <p className="mt-1 text-xs text-gray-600">
            FreshCart brings you fresh products with modern shopping experience.
          </p>
        </div>

        {/* Quick Links */}
   
          {Token ?     <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-1 text-sm text-gray-600">
            <li><Link to="/home" className="hover:text-[#0AAD0A] transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-[#0AAD0A] transition">Products</Link></li>
            <li><Link to="/categories" className="hover:text-[#0AAD0A] transition">Categories</Link></li>
            <li><Link to="/brandes" className="hover:text-[#0AAD0A] transition">Brands</Link></li>
          </ul>
        </div>:""}
        {/* Socials */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-[#0AAD0A] text-gray-700 hover:text-white rounded-lg transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-[#0AAD0A] text-gray-700 hover:text-white rounded-lg transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-[#0AAD0A] text-gray-700 hover:text-white rounded-lg transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-[#0AAD0A] text-gray-700 hover:text-white rounded-lg transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-3 text-center text-xs text-gray-500">
        © 2025 FreshCart. All Rights Reserved.
      </div>
    </footer>
  );
}
