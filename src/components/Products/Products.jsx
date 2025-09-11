import React, { useContext, useState, useRef, useEffect } from 'react';
import useProducts from '../../Customs/useProducts';
import LoderScren from '../LoderScren/LoderScren';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import ProductCard from '../ProductCard/ProductCard';

export default function Products() {

  const totalPages = 3;
  const [filters, setFilters] = useState({ sort: "" });
  const { res, page, setpage } = useProducts(filters);
  const [shouldScroll, setShouldScroll] = useState(false);

  const productsSectionRef = useRef(null);


  useEffect(() => {
    if (!res.isLoading && shouldScroll) {
      productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [res.isLoading, shouldScroll]);

  const AllProducts = res.data?.data.data;

  if (res.isError) return <NotFound />;
  if (res.isLoading) return <LoderScren />;

  
  function pageP() {
    setpage(page < totalPages ? page + 1 : 1);
    setShouldScroll(true); 
  };

  function pageN() {
    setpage(page > 1 ? page - 1 : totalPages);
    setShouldScroll(true);
  };

  function goToPage(index) {
    setpage(index);
    setShouldScroll(true);
  }

  return (
    <div className="mt-12 px-4 md:px-10" ref={productsSectionRef} >

      {/* Section Title */}
      <div
        className="text-center mb-8"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Our <span className="text-green-600">Products</span>
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-base">
          Find the best deals tailored just for you ✨
        </p>
        <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex justify-start mb-8">
        <div className="relative w-52">
          <select
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            value={filters.sort}
            className="appearance-none w-full px-4 py-2 pr-10 rounded-xl border border-gray-200 
               text-sm font-medium
                 focus:ring-2 focus:ring-green-600 focus:border-green-600
                 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <option value="">Sort By</option>
            <option value="price">Price: Low → High</option>
            <option value="-price">Price: High → Low</option>
            <option value="-ratingsAverage">Best Rated</option>
            <option value="-createdAt">Newest</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            <i className="fas fa-chevron-down text-xs"></i>
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {AllProducts?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-12">
        <button
          onClick={pageN}
          className="p-3 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition"
        >
          <i className="fas fa-arrow-left"></i>
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${page === index + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 "
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={pageP}
          className="p-3 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white  transition"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
