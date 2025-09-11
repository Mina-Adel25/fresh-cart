import React, { useContext } from "react";
import { authcontext } from "../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle, FaBoxOpen } from "react-icons/fa";
import LoaderScreen from "../LoderScren/LoderScren";

export default function Allorders() {
    const { userData } = useContext(authcontext);

    const GetAllOrders = async () => {
        if (!userData?.id) return [];
        const res = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
        );
        return res.data;
    };

    const { data, isError, isLoading } = useQuery({
        queryKey: ["allOrder", userData?.id],
        queryFn: GetAllOrders,
        enabled: !!userData?.id,
    });

    if (isLoading) return <LoaderScreen />;
    if (isError) return <p className="text-center text-red-500">Error loading orders</p>;

    const Allorders = data;

    return (
        <div className="p-6 space-y-10 " data-aos="fade-up">

            {/* ===== Page Intro Section ===== */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Explore Your <span className="text-green-600">Orders</span>
                </h2>
                <p className="mt-3 text-gray-500 text-sm md:text-base">
                    Track your purchase history, payment status, and delivery details in one place.
                </p>
                <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* ===== Orders Grid ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Allorders?.map((order) => (
                    <div
                        key={order._id}
                        className="relative bg-white  rounded-2xl border border-green-200 
                        shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
                        data-aos="zoom-in"

                    >
                        {/* Card Title */}
                        <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-2">
                            <FaBoxOpen className="text-green-600" /> Order #{order.id}
                        </h2>

                        {/* Card Info */}
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Date:</span> {order.createdAt.split("T")[0]}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium ">Payment:</span> {order.paymentMethodType}
                        </p>
                        <p className="text-sm text-gray-600 mb-1 font-medium ">
                            Total: <span className=" text-green-600">{order.totalOrderPrice} EGP</span>
                        </p>

                        {/* Card Status */}
                        <p className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                            <span className="font-medium">Paid:</span>
                            {order.isPaid ? (
                                <FaCheckCircle className="text-green-600" />
                            ) : (
                                <FaTimesCircle className="text-red-500" />
                            )}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="font-medium">Delivered:</span>
                            {order.isDelivered ? (
                                <FaCheckCircle className="text-green-600" />
                            ) : (
                                <FaTimesCircle className="text-red-500" />
                            )}
                        </p>

                        {/* Products Thumbnails with Details */}
                        <div className="mt-4">
                            <p className="font-medium text-gray-900 mb-2">Products:</p>
                            <div className="grid grid-cols-3 xl:grid-cols-4 gap-2  pb-2">
                                {order.cartItems?.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex flex-col items-center text-center p-1 rounded-lg  border border-green-400 min-w-[80px] max-w-[80px] overflow-hidden grid-cols-1"
                                    >
                                        <img
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            className="w-14 h-14 object-contain mb-1"
                                        />
                                        {/* اسم المنتج كلمتين بس */}
                                        <p className="text-[10px] font-medium text-gray-800 truncate">
                                            {item.product.title.split(" ").slice(0, 2).join(" ")}
                                        </p>
                                        <p className="text-[11px] text-green-700">
                                            {item.price} EGP * {item.count}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
