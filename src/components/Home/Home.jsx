import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Puff } from 'react-loader-spinner';
import LoderScren from '../LoderScren/LoderScren';
import HomeSlider from '../HomeSlider/HomeSlider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useProducts from '../../Customs/useProducts';
import Products from '../Products/Products';
import useCategories from '../../Customs/useCategories';
import useBrandes from '../../Customs/useBrandes';
import SliderSection from '../SliderSection/SliderSection';


export default function Home() {
  const { data: categories } = useCategories();
  const { data: brands } = useBrandes();



  return (
    <div className=''>

      <HomeSlider />

      <div className="my-3">
        <SliderSection title="Categories" data={categories} rtl={true} url="categories" />
      </div>
      <div className="my-3">
        <SliderSection title="Brands" data={brands} rtl={false} url="brandes" />
      </div>

      <Products />


    </div>
  )
}
