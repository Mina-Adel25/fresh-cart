import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useItemsPage(type, id) {
    console.log(type, id);
    
    function GetItems() {
        let url = "";
        if (type === "Categories") {
            url = `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`;
        } else if (type === "Brands") {
            url = `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`;
        }
        return axios.get(url);
    }
    
    const { data:itemData, isError, isLoading } = useQuery({
        queryKey: ["Items", type, id],
        queryFn: GetItems,
    });
    return {itemData, isError, isLoading}
}
