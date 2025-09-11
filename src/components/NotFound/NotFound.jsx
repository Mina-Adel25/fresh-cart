import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-6">

      <img
        src={notFound}
        alt="Page not found"
        className="w-full max-w-md "
      />

   
      <h2 className="mt-6 text-3xl md:text-5xl font-extrabold text-gray-800 ">
        Oops! Page not found
      </h2>

     
      <p className="mt-3 text-gray-500  max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

     
      <Link
        to="/"
        className="mt-8 inline-block px-8 py-3 bg-[#0AAD0A] text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-green-600 transition-transform duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
