import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/images/close-up-air-fryer (1).jpg"; 
import img2 from "../../assets/images/portrait-amused-interested-cute-20s-european-girl-wearing-sweater-headband-looking-upper-left-corner-pointing-sideways-smiling-intrigued-ecstatic-captured-by-curious-promo-yellow-wall.jpg"; 
import img3 from "../../assets/images/2798.jpg"; 

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    cssEase: "ease-in-out",
  };

  const slides = [
    {
      img: img1,
      badge: "30%",
      title: "Top Electronics ",
      subtitle: "Upgrade your tech with the latest gadgets at great prices.",
      price: "From 1,200 EGP",
    },
    {
      img: img2,
      badge: "50%",
      title: "Fashion Trends ",
      subtitle: "Stay stylish with our newest clothing collections.",
      price: "From 500 EGP",
    },
    {
      img: img3,
      badge: "40%",
      title: "Home & Lifestyle ",
      subtitle: "Exclusive deals to enhance your home and daily life.",
      price: "From 250 EGP",
    },
  ];

  return (
    <div className="slider-container w-[95%]  m-auto relative">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative w-full h-52 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg"
          >
     
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover transform transition-transform duration-700 "
            />

         
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute top-0 left-2 lg:left-10 md:w-2/3 w-6/6 h-full flex flex-col justify-center items-start p-4 sm:p-6 space-y-3 text-left">
              
              <span className="bg-red-600 text-white text-xs font-semibold px-1 md:px-3 py-1 rounded-full shadow-md fa-beat" >
                {slide.badge} OFF
              </span>

            
              <h3 className="text-white text-xl mt-0 p-0 sm:text-4xl md:text-4xl font-bold drop-shadow-lg ">
                {slide.title}
              </h3>

              <p className="text-gray-200 text-xs mt-0 p-0 sm:text-base md:text-lg drop-shadow-sm ">
                {slide.subtitle}
              </p>

           
              <p className="text-yellow-600 mt-0 text-sm sm:text-xl md:text-2xl font-black drop-shadow-sm  animate-pulse">
                {slide.price}
              </p>

   
              <a
                href="products"
                className="mt-0 md:mt-2 bg-[#0AAD0A] text-white p-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition "
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
