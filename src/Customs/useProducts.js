import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function useProducts(filters) {

  const [page, setpage] = useState(1);

  function GetAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        limit: 20,
        page,
        sort: filters.sort || "",
      }
    });
  }

  const res = useQuery({
    queryKey: ["Details", page, filters],
    queryFn: GetAllProducts,
    retry: 1,
    keepPreviousData: true,
  });

  return { res, page, setpage };
}
