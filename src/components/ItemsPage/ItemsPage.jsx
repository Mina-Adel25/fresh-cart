
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoderScren from '../LoderScren/LoderScren'
import img from '../../../src/assets/images/Documents-bro.svg'
import NotFound from '../NotFound/NotFound'

import ProductCard from '../ProductCard/ProductCard'

export default function ItemsPage() {
  const { type, id } = useParams();




  function GetItems() {
    let url = "";
    if (type === "Categories") {
      url = `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`;
    } else if (type === "Brands") {
      url = `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`;
    }
    return axios.get(url);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Items", type, id],
    queryFn: GetItems,
  });

  if (isError) return <NotFound />;
  if (isLoading) return <LoderScren />;

  const allItems = data?.data.data;

  if (allItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4">

        <div className="w-full max-w-md">
          <img
            src={img}
            alt="No items"
            className="w-full object-contain"
          />
        </div>


        <h3 className=" text-2xl md:text-3xl font-bold text-gray-800 ">
          No items found
        </h3>
        <p className="mt-3 text-gray-500  text-center max-w-md">
          It seems there are no products available in this section.
          Try exploring other categories or check back later.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-[#0AAD0A] text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    );
  }



  return (
    <section className="container mx-auto px-4 md:px-8" data-aos="fade-up">

      {/* Section Title */}
      <div className="text-center my-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900  tracking-tight">
          {type === "Categories"
            ? `Category: ${allItems?.[0]?.category?.name || ""}`
            : `Brand: ${allItems?.[0]?.brand?.name || ""}`}
        </h2>
        <p className="mt-3 text-gray-500 text-base">
          Showing {allItems?.length || 0} items
        </p>
        <div className="w-20 h-1 bg-[#0AAD0A] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {allItems?.map((item) => (
          <ProductCard  key={item._id} item={item} />
        ))}
      </div>
    </section>
  )
}
