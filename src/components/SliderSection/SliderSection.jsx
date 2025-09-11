import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";   // 👈 إضافة autoplay
import { Link } from "react-router-dom";

export default function SliderSection({ title, data, rtl, url }) {
    const items = data?.data.data;

    return (
        <div data-aos="fade-up" data-aos-duration="3000">
            {items ? (
                <div className="flex justify-between items-center py-4 px-3">
                    <h2 className="text-gray-800 text-sm md:text-2xl font-bold tracking-wide">
                        Shop Popular <span className="text-[#0AAD0A]">{title}</span>
                    </h2>

                    <Link
                        to={`/${url}`}
                        className="flex items-center gap-1 md:font-bold text-black hover:text-green-600 transition-all duration-200 text-xs"
                    >
                        View All {title}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-right animate-moveRight"
                            aria-hidden="true"
                        >
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </Link>
                </div>
            ) : null}

            <div className="slider-container w-full px-4">
                <Swiper
                    dir={rtl ? "rtl" : "ltr"}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true}
                    speed={2000} 
                    autoplay={{
                        delay: 0,             
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        360: { slidesPerView: 3 },
                        390: { slidesPerView: 3 },
                        480: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5},
                        1280: { slidesPerView: 7 },
                    }}
                    modules={[Autoplay]}
                >


                {items?.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Link
                            to={`/ItemsPage/${title}/${item._id}`}
                            className="text-center group overflow-hidden"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-36 lg:w-36 mx-auto rounded-full transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
                            />
                            <h3 className="mt-2 text-base font-medium transition-all duration-500 ease-in-out group-hover:scale-125 group-hover:text-green-600">
                                {item.name}
                            </h3>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </div >
    );
}
