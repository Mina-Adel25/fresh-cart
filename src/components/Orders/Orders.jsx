import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import img from "../../assets/images/Cash Payment-bro.svg"
import axios from 'axios';
import { cartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { FaCreditCard } from 'react-icons/fa';
import { authcontext } from '../../Context/AuthContext';
import { TbCashRegister } from 'react-icons/tb';

export default function Orders() {
  const { CartId, resteValues } = useContext(cartContext);
  const { Token } = useContext(authcontext);
  const baseUrl = `https://mina-adel25.github.io/fresh-cart`;

  const navigate = useNavigate();

  // State to handle payment type
  const [isCash, setisCash] = useState(true);

  // Loading states for each button
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingOnline, setLoadingOnline] = useState(false);

  // Function to create a cash order
  function createCashOrder(values) {
    setLoadingCash(true);
    axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
      { shippingAddress: values },
      { headers: { token: Token } }
    )
      .then(() => {
        toast.success("Cash order created successfully");
        resteValues();
        navigate("/home");
      })
      .catch(() => toast.error("Error creating cash order"))
      .finally(() => setLoadingCash(false));
  }

  // Function to create an online checkout session
  function createCheckoutSession(values) {
    setLoadingOnline(true);
    axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${baseUrl}`,
      { shippingAddress: values },
      { headers: { token: Token } }
    )
      .then(res => {
        toast.success("Redirecting to payment...");
        window.open(res.data.session.url, "_self");
        setisCash(false);
      })
      .catch(() => toast.error("Error in online payment"))
      .finally(() => setLoadingOnline(false));
  }

  // Formik configuration
  const FormkOpj = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: function (values) {
      if (isCash) {
        createCashOrder(values);
      } else {
        createCheckoutSession(values)
      }
    },

    validationSchema: yup.object().shape({
      phone: yup.string()
        .required("Phone is required")
        .matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number"),
      city: yup.string().required("City is required"),
      details: yup.string().required("Details are required"),
    })
  });

  return (
    <div className="flex justify-center items-center flex-col md:flex-row md:h-[82vh] bg-gradient-to-br px-3 mt-4 md:mt-0">

      {/* Checkout illustration */}
      <div>
        <img src={img} alt="Checkout Illustration" className='w-full' />
      </div>

      {/* Checkout form */}
      <form className="w-full max-w-2xl bg-white  rounded-2xl shadow-2xl p-8" onSubmit={FormkOpj.handleSubmit}>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800  mb-2 flex justify-center items-center gap-1">
          Checkout Now <TbCashRegister />
        </h2>

        {/* Phone input */}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            Phone
          </label>
          <input
            value={FormkOpj.values.phone}
            onChange={FormkOpj.handleChange}
            onBlur={FormkOpj.handleBlur}
            placeholder="01XXXXXXXXX"
            type="tel"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                    "
          />
          {FormkOpj.errors.phone && FormkOpj.touched.phone && (
            <p className="mt-2 text-sm text-red-600">{FormkOpj.errors.phone}</p>
          )}
        </div>

        {/* City input */}
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
            City
          </label>
          <input
            value={FormkOpj.values.city}
            onChange={FormkOpj.handleChange}
            onBlur={FormkOpj.handleBlur}
            type="text"
            id="city"
            name="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                    "
          />
          {FormkOpj.errors.city && FormkOpj.touched.city && (
            <p className="mt-2 text-sm text-red-600">{FormkOpj.errors.city}</p>
          )}
        </div>

        {/* Address details input */}
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 ">
            Address Details
          </label>
          <textarea
            value={FormkOpj.values.details}
            onChange={FormkOpj.handleChange}
            onBlur={FormkOpj.handleBlur}
            id="details"
            name="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                    "
          />
          {FormkOpj.errors.details && FormkOpj.touched.details && (
            <p className="mt-2 text-sm text-red-600">{FormkOpj.errors.details}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-between md:flex-row flex-col gap-2">

          {/* Cash button with loader */}
          <button
            onClick={() => setisCash(true)}
            type="submit"
            disabled={loadingCash}
            className="w-full md:w-1/4 py-2.5 text-sm font-semibold text-white  
                       bg-gradient-to-r from-green-700 to-slate-700  
                       hover:from-green-800 hover:to-slate-800 focus:ring-4 
                       focus:outline-none focus:ring-transparent
                       rounded-lg transition-all duration-300 shadow-md flex justify-center items-center gap-2"
          >
            {loadingCash ? (
              <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Pay with Cash $"
            )}
          </button>

          {/* Online payment button with loader */}
          <button
            onClick={() => setisCash(false)}
            type="submit"
            disabled={loadingOnline}
            className="w-full md:w-1/4 py-2.5 text-sm font-semibold text-white 
                       bg-gradient-to-r from-slate-700 to-green-700 
                       hover:from-gray-800 hover:to-green-800 focus:ring-4 
                       focus:outline-none focus:ring-transparent
                       rounded-lg transition-all duration-300 shadow-md flex justify-center items-center gap-2"
          >
            {loadingOnline ? (
              <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Pay Online <FaCreditCard />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
