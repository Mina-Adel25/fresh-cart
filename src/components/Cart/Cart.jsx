import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import LoaderScreen from "../LoderScren/LoderScren";
import toast from "react-hot-toast";
import { FaCreditCard, FaTrash } from "react-icons/fa";
import imgAddtocart from "../../assets/images/add-to-cart-animate.svg";
import { Link } from "react-router-dom";
import useCart from "./useCart";
import { ThreeDots } from "react-loader-spinner";

export default function Cart() {

  const { loadingId, totalCartPrice, products, HandleremoveItem, HandleChangeCont, clearCart, buttonSubmitcart } = useCart();

  if (!products && products === null) {
    return <LoaderScreen />;
  }

  if (products.length === 0 || products === null) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <img
            src={imgAddtocart}
            alt="No items"
            className="w-full object-contain"
          />
        </div>

        <p className="mt-3 text-gray-500  text-center max-w-md">
          Oops! Your Cart Is Empty.
          Start shopping now and find something you love!
        </p>
        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-[#0AAD0A] text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">
          Your <span className="text-green-600">Cart</span>
        </h2>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          You have {products.length} items ready to checkout
        </p>
        <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {products?.map((item) => (
          <div
            key={item._id}
            className="flex items-center bg-white rounded-xl shadow hover:shadow-lg transition p-3 md:p-4"
          >
            {/* Image */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-gray-200 ">
              <img
                src={item?.product.imageCover}
                alt={item?.product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 px-3 md:px-5">
              <h2 className="text-sm md:text-base font-semibold text-gray-900  line-clamp-2">
                {item?.product.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-500  mt-1">
                {item?.product.category.name} • {item?.product.brand.name}
              </p>
              <p className="text-xs md:text-sm text-yellow-500 mt-1">
                ⭐ {item?.product.ratingsAverage.toFixed(1)}
              </p>
              <p className="text-base md:text-lg font-bold text-gray-800  mt-2">
                {item.price} EGP
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3">
              {/* Quantity Control */}
              <div className="flex items-center border border-gray-300  rounded-lg overflow-hidden">
                <button
                  disabled={loadingId === item?.product._id}
                  onClick={() =>
                    HandleChangeCont(item?.product._id, item.count - 1)
                  }
                  className="w-7 h-7 flex items-center justify-center bg-gray-100  hover:bg-gray-200   transition disabled:bg-gray-300 text-lg"
                >
                  {loadingId === item?.product._id ? (
                    <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "-"
                  )}
                </button>
                <div className="w-10 text-center text-sm md:text-base font-medium ">
                  {item.count}
                </div>
                <button
                  disabled={loadingId === item?.product._id}
                  onClick={() =>
                    HandleChangeCont(item?.product._id, item.count + 1)
                  }
                  className="w-7 h-7 flex items-center justify-center bg-gray-100  hover:bg-gray-200  text-gray-700  transition disabled:bg-gray-300 text-lg"
                >
                  {loadingId === item?.product._id ? (
                    <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "+"
                  )}
                </button>
              </div>

              {/* Remove */}
              {buttonSubmitcart ? <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition">
                <ThreeDots
                  visible={true}
                  height="23"
                  width="40"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                /></div>
                :
                <button
                  onClick={() => HandleremoveItem(item?.product._id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition"
                >
                  Remove <FaTrash className="text-xs" />
                </button>}

            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-center mt-8 border-t border-gray-300  pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 ">
          Total:{" "}
          <span className="text-green-600 font-extrabold">
            {totalCartPrice} EGP
          </span>
        </h2>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
        {buttonSubmitcart ? <div
         className="md:w-1/3 py-3 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition flex items-center justify-center gap-2">
          <ThreeDots
            visible={true}
            height="23"
            width="40"
            color="white"
            radius="9"
            ariaLabel="three-dots-loading"
          />

        </div>
          :
          <button
            onClick={clearCart}
            className="md:w-1/3 py-3 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition flex items-center justify-center gap-2" >
            Clear Cart <FaTrash />
          </button>
        }

        <Link
          to="/orders"
          className="md:w-1/3 py-3 px-5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition flex items-center justify-center gap-2"
        >
          Checkout <FaCreditCard />
        </Link>
      </div>
    </div>
  );
}

