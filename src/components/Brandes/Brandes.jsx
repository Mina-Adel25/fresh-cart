import React from 'react'
import useBrandes from '../../Customs/useBrandes'
import LoderScren from '../LoderScren/LoderScren';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

export default function Brandes() {
  const { data, isError, isLoading } = useBrandes();
  const AllBrandes = data?.data.data;

  if (isError) return <NotFound/>;
  if (isLoading) return <LoderScren />;

  return (
    <section className="container mx-auto px-4 md:px-8" data-aos="fade-up">
      {/* Section Title */}
      <div className="text-center my-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Top <span className="text-[#0AAD0A]">Brands</span>
        </h2>
        <p className="mt-3 text-gray-500 text-base">
          Discover products across multiple Brandes 🔍
        </p>
        <div className="w-20 h-1 bg-[#0AAD0A] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {AllBrandes?.map((item) => (
          <Link
            to={`/ItemsPage/Brands/${item._id}`}
            key={item._id}
            className="relative flex flex-col items-center group"
             data-aos="zoom-in"
          >
            {/* Brand Logo */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain rounded-full shadow-lg border border-gray-200  transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-[#0AAD0A]/10 opacity-0 group-hover:opacity-100 blur-2xl transition"></div>
            </div>

            {/* Brand Name */}
            <h3 className="mt-4 text-lg font-medium text-gray-800  transition group-hover:text-[#0AAD0A] group-hover:scale-110">
              {item.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
