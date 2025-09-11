import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { wishlistContext } from '../../Context/WishlistContext';
import useWishlist from '../../Customs/useWishlist';

export default function ProductCard({ item }) {

  const { addProdeuctToCartid, buttonSubmitcart } = useContext(cartContext);
  const { buttonSubmitWis } = useContext(wishlistContext);
  const { handleToggleWishlist, isInWishlist } = useWishlist(item._id);




  async function handleAddCart(id) {
    const res = await addProdeuctToCartid(id);
    if (res) {
      toast.success("Added to Cart", { position: "top-center" });
    } else {
      toast.error("Failed to add item to Cart", { position: "top-center" });
    }
  }

  return (
    <div
      className="relative bg-white  border border-gray-100  rounded-2xl
      shadow-sm hover:shadow-2xl overflow-hidden group transition-all duration-500"
      data-aos="zoom-in"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.imageCover}
          alt={item.title}
          className="w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rating Badge */}
        <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
          ★ {item.ratingsAverage}
        </span>

        {/* Hover Layer */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
          flex flex-col md:flex-row items-center justify-center gap-4 transition-all duration-500 z-20">

          {/* Wishlist Button */}
          {!buttonSubmitWis ? (
            <button
              onClick={() => handleToggleWishlist(item._id)}
              className="w-12 h-12 flex items-center justify-center 
              bg-white text-gray-700 rounded-full shadow-md hover:scale-110 hover:bg-yellow-400 hover:text-white transition duration-500"
            >
              <i
                className={`fa-heart fa-solid text-xl ${isInWishlist ? " text-red-600" : ""
                  }`}
              ></i>
            </button>
          ) : (
            <div className="flex justify-center items-center bg-yellow-400 py-2.5 rounded-full w-12 h-12">
              <span className="loader w-6 h-6  border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            </div>
          )}

          {/* View Details Button */}
          <Link
            to={`/Productdetails/${item._id}`}
            className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 
            rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:scale-110 transition duration-500"
          >
            <i className="fa-solid fa-circle-info"></i>
          </Link>

          {/* Cart Button */}
          {!buttonSubmitcart ? (
            <button
              onClick={() => handleAddCart(item._id)}
              className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 
              rounded-full shadow-md hover:bg-green-600 hover:text-white hover:scale-110 transition duration-500"
            >
              <i className="fa-solid fa-cart-plus"></i>
            </button>
          ) : (
            <div className="flex justify-center items-center bg-green-600 py-2.5 rounded-full w-12 h-12">
              <span className="loader w-6 h-6  border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <Link to={`/Productdetails/${item._id}`}>
        <div className="p-4">
          <p className="text-xs uppercase text-green-600 font-medium tracking-wide">
            {item.category.name}
          </p>
          <h2 className="mt-1 font-extralight text-gray-800  text-xl line-clamp-2">
            {item.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-700 ">
              Price :
              <span className="text-red-600 font-sans text-xl"> {item.price} EGP</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
