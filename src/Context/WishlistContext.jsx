import React, { createContext, useContext, useEffect, useState } from 'react'
import { authcontext } from './AuthContext';
import axios from 'axios';

export const wishlistContext = createContext();

export default function WishlistContext({ children }) {

  const { Token } = useContext(authcontext);

  const [buttonSubmitWis, setbuttonSubmitWis] = useState(false);
  const [wishlist, setWishlist] = useState(null); 
  const numfWishlistItems = wishlist?.length;
  

  async function AddProductToWishlist(id) {
    setbuttonSubmitWis(true);
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers: { token: Token } }
      )
      .then(function (res) {
        setbuttonSubmitWis(false);
        GetUserwishlist();
        return true;
      })
      .catch(function (error) {
        setbuttonSubmitWis(false);
        console.log("error", error);
        return false;
      });

    return res;
  }

  async function RemoveProductFromWishlist(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: Token },
      })
      .then(function (res) {
        GetUserwishlist(); 
        return true;
      })
      .catch(function (error) {
        console.log("err", error);
        return false;
      });
    return res;
  }

  async function GetUserwishlist() {
    setbuttonSubmitWis(true);
    const res = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: Token },
      })
      .then(function (res) {
        setbuttonSubmitWis(false);
        setWishlist(res.data.data); // update state
        return true;
      })
      .catch(function (error) {
        setbuttonSubmitWis(false);
        console.log("error", error);
        return false;
      });

    return res;
  }

  useEffect(() => {
    if (Token) {
      GetUserwishlist();
    }
  }, [Token]);

  return (
    <wishlistContext.Provider
      value={{
        AddProductToWishlist,
        RemoveProductFromWishlist, 
        buttonSubmitWis,
        GetUserwishlist,
        numfWishlistItems,
        wishlist, 
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
