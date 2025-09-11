import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authcontext } from './AuthContext';



export const cartContext = createContext()
export default function CartContextProVider({ children }) {

    const { Token } = useContext(authcontext);

    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [products, setproducts] = useState(null)
    const [buttonSubmitcart, setbuttonSubmitcart] = useState(false);
    const [CartId, setCartId] = useState(null)
    const numfCartItems = products?.length;

    function resteValues() {
        settotalCartPrice(0);
        setproducts(null);
        setCartId(null)
    }

    async function addProdeuctToCartid(id) {
        setbuttonSubmitcart(true)
        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            { productId: id },
            {
                headers: {
                    token: Token
                }
            })
            .then(function (res) {
                setbuttonSubmitcart(false)
                getUserCart()
                return true
            })
            .catch(function (error) {
                setbuttonSubmitcart(false)
                console.log("error", error);
                return false
            })

        return res
    }


    async function getUserCart() {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: Token,
            }
        })
            .then(function (res) {
                settotalCartPrice(res.data.data.totalCartPrice)
                setproducts(res.data.data.products)
                setCartId(res.data.cartId)
            })
            .catch(function (error) {
                console.log("err", error);
            })
    }

    async function updateCont(id, newCont) {
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { count: newCont },
            { headers: { Token } }
        )
            .then(function (res) {
                settotalCartPrice(res.data.data.totalCartPrice)
                setproducts(res.data.data.products)
                return true
            })
            .catch(function (error) {
                console.log("err", error);
                return false
            })
        return res

    }

    async function removeItem(id) {
        setbuttonSubmitcart(true)
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { headers: { Token } }
        )
            .then(function (res) {
                setbuttonSubmitcart(false)
                settotalCartPrice(res.data.data.totalCartPrice)
                setproducts(res.data.data.products)
                return true
            })
            .catch(function (error) {
                setbuttonSubmitcart()
                console.log("err", error);
                return false
            })
        return res

    }

    async function clearCart() {
        setbuttonSubmitcart(true)
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            { headers: { Token } }
        )
            .then(function (res) {
                setbuttonSubmitcart(false)
                settotalCartPrice(0)
                setproducts([])
                return true
            })
            .catch(function (error) {
                setbuttonSubmitcart(false)
                console.log("err", error);
                return false
            })
        return res

    }

    useEffect(() => {
        if (Token) {
            getUserCart()
        }

    }, [Token])


    return (
        <cartContext.Provider
            value={{
                addProdeuctToCartid,
                numfCartItems,
                totalCartPrice,
                products,
                buttonSubmitcart,
                updateCont,
                removeItem,
                clearCart,
                CartId,
                Token,
                resteValues,
            }}
        >
            {children}
        </cartContext.Provider>
    )
}
