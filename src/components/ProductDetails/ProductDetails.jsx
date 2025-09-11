import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import LoderScren from "../LoderScren/LoderScren";
import NotFound from "../NotFound/NotFound";
import { cartContext } from "../../Context/CartContext";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";
import useWishlist from "../../Customs/useWishlist";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  const { addProdeuctToCartid, buttonSubmitcart } = useContext(cartContext);
  const { buttonSubmitWis } = useContext(wishlistContext);

  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);

  const { handleToggleWishlist, isInWishlist } = useWishlist(id);

  // Add product to cart
  async function handelAddCart() {
    const res = await addProdeuctToCartid(id);
    if (res) {
      toast.success("Added to cart", {
        position: "top-center",
      });
    } else {
      toast.error("Failed to add item to cart", {
        position: "top-center",
      });
    }
  }

  // Fetch product details by ID
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProductDetails,
  });

  if (isError) return <NotFound />;
  if (isLoading) return <LoderScren />;

  const product = data?.data.data;

  // Set first image as main image if not already set
  if (!mainImage && product.images?.length > 0) {
    setMainImage(product.images[0]);
  }

  // React-slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-5 grid md:grid-cols-2 gap-10">
        <div>
          {/* Main product image */}
          <div className="flex justify-center mb-6">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full max-h-[500px] object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Thumbnail images slider */}
          <Slider {...settings}>
            {product.images?.map((img, index) => (
              <div key={index} className="px-2">
                <img
                  src={img}
                  alt={product.title}
                  className={`w-full h-28 object-contain rounded-lg border cursor-pointer transition ${
                    mainImage === img
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product details section */}
        <div className="flex flex-col justify-center space-y-5 relative">
          {/* Wishlist button */}
          {!buttonSubmitWis ? (
            <button
              onClick={() => handleToggleWishlist(id)}
              className=" absolute top-0 end-0 w-12 h-12 flex items-center justify-center 
                       text-gray-700 rounded-full  hover:scale-125   transition duration-500"
            >
              <i
                className={` fa-heart text-xl fa-solid hover:text-red-600 ${
                  isInWishlist
                    ? "fa-solid text-red-600"
                    : "fa-regular"
                }`}
              ></i>
            </button>
          ) : (
            <span className="loader absolute top-3 end-3 w-5 h-5 border-2  text-red-600 border-red-500 border-t-transparent rounded-full animate-spin"></span>
          )}

          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-400">
            Category: {product.category.name}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-green-700">
              price: {product.price} EGP
            </span>
            <span className="text-yellow-500">
              {product.ratingsAverage} ★
            </span>
          </div>

          {/* Add to cart button */}
          {!buttonSubmitcart ? (
            <button
              onClick={handelAddCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex justify-center items-center bg-green-600 rounded-lg py-3">
              <ThreeDots
                visible={true}
                height="23"
                width="40"
                color="white"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            </div>
          )}
        </div>
      </div>

      {/* Related products section */}
      <RelatedProducts
        categoryId={product.category._id}
        categoryName={product.category.name}
      />
    </>
  );
}
