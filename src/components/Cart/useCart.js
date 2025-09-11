import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function useCart() {
  const {
    products,
    totalCartPrice,
    updateCont,
    removeItem,
    clearCart,
    buttonSubmitcart,
  } = useContext(cartContext);

  const [loadingId, setLoadingId] = useState(null);

  async function HandleChangeCont(id, newCont) {
    if (newCont < 1) return;
    setLoadingId(id);
    try {
      const res = await updateCont(id, newCont);
      if (res) {
        toast.success("Quantity updated ✅", { position: "top-center" });
      } else {
        toast.error("Failed to update ❌", { position: "top-center" });
      }
    } catch {
      toast.error("Something went wrong ❌", { position: "top-center" });
    } finally {
      setLoadingId(null);
    }
  }

  async function HandleremoveItem(id) {


    await removeItem(id);

  }


  return { loadingId, totalCartPrice, products, HandleremoveItem, HandleChangeCont, clearCart, buttonSubmitcart }
}
