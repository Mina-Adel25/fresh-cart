import React, { useContext } from 'react'
import { wishlistContext } from '../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function useWishlist(productId) {
  const { AddProductToWishlist, RemoveProductFromWishlist, wishlist } = useContext(wishlistContext);

  const isInWishlist = wishlist?.some(w => w._id === productId);
  
  async function handleToggleWishlist() {
    if (isInWishlist) {
      const res = await RemoveProductFromWishlist(productId);
      if (res) {
        toast.error("Removed from Wishlist", { position: "top-center" });
      } else {
        toast.error("Failed to remove item", { position: "top-center" });
      }
    } else {
      const res = await AddProductToWishlist(productId);
      if (res) {
        toast.success("Added to Wishlist", { position: "top-center" });
      } else {
        toast.error("Failed to add item", { position: "top-center" });
      }
    }
  }

  return { isInWishlist, handleToggleWishlist };
}
