import React, { useContext } from 'react';
import { wishlistContext } from '../../Context/WishlistContext';
import ProductCard from '../ProductCard/ProductCard';
import imgAddtocart from "../../assets/images/online-wishes-list-animate.svg";
import { Link } from 'react-router-dom';
import LoaderScreen from '../LoderScren/LoderScren';

export default function Wishlist() {
  const { wishlist } = useContext(wishlistContext);

  // Show loader while wishlist is undefined (not loaded yet)
  if (!wishlist) {
    return <LoaderScreen />;
  }

  // Show empty state if wishlist is loaded but has no items
  if (wishlist?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <img
            src={imgAddtocart}
            alt="No items"
            className="w-full object-contain"
          />
        </div>

        <p className="mt-3 text-gray-500 dark:text-gray-400 text-center max-w-md">
          Oops! Your <span className="font-semibold text-green-600">Wishlist</span> is empty.  
          Start saving your favorite products now!
        </p>

        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-[#0AAD0A] text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Show wishlist products
  return (
    <>
      {/* Page Title */}
      <div className="text-center mt-12 mb-5" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          My <span className="text-green-600">Wishlist</span>
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-base">
          All the products you've saved for later ❤️
        </p>
        <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Wishlist Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-4 md:px-10">
        {wishlist?.map((item) => (
          <ProductCard key={item._id} item={item} fromWishlist={true} />
        ))}
      </div>
    </>
  );
}
