import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function RelatedProducts({ categoryId, categoryName, rtl }) {
  if (!categoryId) return null;

  function GetItems() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
  }

  const { data, isError } = useQuery({
    queryKey: ["RelatedProducts", categoryId],
    queryFn: GetItems,
  });

  const relatedProducts = data?.data?.data || [];

  if (isError) return <p className="text-red-500">Failed to load products.</p>;

  return (
    <div className="mt-10 px-5 w-11/12 mx-auto relative">
      <h2 className="text-xl font-bold mb-4">
        More from <span className="text-green-600">{categoryName}</span>
      </h2>

      {relatedProducts.length === 0 ? (
        <p className="text-gray-500">No related products found.</p>
      ) : (
        <>
          <Swiper
            dir={rtl ? "rtl" : "ltr"}
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={5}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              360: { slidesPerView: 1 },
              390: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="w-48 m-auto  sm:w-60  ">
                  <ProductCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev-custom absolute top-1/2 left-[-15px] z-10 cursor-pointer p-1 rounded-full bg-white shadow hover:bg-gray-100">
            <FaChevronLeft size={14} className="text-gray-700" />
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-[-15px] z-10 cursor-pointer p-1 rounded-full bg-white shadow hover:bg-gray-100">
            <FaChevronRight size={14} className="text-gray-700" />
          </div>
        </>
      )}
    </div>
  );
}
