import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useBrandes() {

    
    function allBrandes() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    };

    const res = useQuery({
        queryKey: ["allBrandes"],
        queryFn: allBrandes,
    })

  return (res)
}
