import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

export default function Register() {

  const Navigate = useNavigate();
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [buttonSubmit, setButtonSubmit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  let user = {
    name: '',
    email: "",
    password: '',
    rePassword: "",
    phone: "",
  };

  async function Submit(values) {
    setButtonSubmit(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(function (res) {
        setIsSuccess(res.data.message);
        setTimeout(() => Navigate("/login"), 2000);
      })
      .catch(function (err) {
        setErrorMessage(err.response.data.message);
        setButtonSubmit(false);
        setTimeout(() => setErrorMessage(null), 2000);
      });
  };

  const myFormik = useFormik({
    initialValues: user,
    onSubmit: Submit,
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is Required").min(3, "Minimum must be 3 characters").max(12, "Maximum must be 12 characters"),
      email: yup.string().required("Email is Required").email("Email must contain '@' and '.'"),
      password: yup.string().required("Password is Required").min(6, "Minimum must be 6 characters").max(12, "Maximum must be 12 characters"),
      rePassword: yup.string().required("Confirm Password is Required").oneOf([yup.ref("password")], "Passwords must match"),
      phone: yup.string().required("Phone is Required").matches(/^01[0125][0-9]{8}$/, "Phone must be an Egyptian number with 11 digits"),
    }),
  });

  return (
    <div className='flex justify-center items-center md:h-[100vh]    px-3 '>
      <form className="w-full max-w-md bg-white  rounded-2xl shadow-2xl p-8" onSubmit={myFormik.handleSubmit}>

        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="h-14 w-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
            <i className="fa-solid fa-user-plus text-white text-xl"></i>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 ">Welcome to FreshCart</h2>
        <p className="text-sm text-gray-500  text-center mb-6">Create your account</p>

        {/* Name */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
          <input
            value={myFormik.values.name}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            name="name"
            placeholder="Enter your name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
          />
          {myFormik.errors.name && myFormik.touched.name && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
          <input
            value={myFormik.values.email}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="email"
            name="email"
            placeholder="name@example.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          />
          {myFormik.errors.email && myFormik.touched.email && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
          <input
            value={myFormik.values.password}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          />
          <i
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute top-10 right-3 text-gray-400 cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
          {myFormik.errors.password && myFormik.touched.password && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.password}</p>
          )}
        </div>

        {/* Re Password */}
        <div className="mb-5 relative">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
          <input
            value={myFormik.values.rePassword}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          />
          <i
            className={`fa-solid ${showRePassword ? "fa-eye-slash" : "fa-eye"} absolute top-10 right-3 text-gray-400 cursor-pointer`}
            onClick={() => setShowRePassword(!showRePassword)}
          ></i>
          {myFormik.errors.rePassword && myFormik.touched.rePassword && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.rePassword}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
          <input
            value={myFormik.values.phone}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="tel"
            name="phone"
            placeholder="01XXXXXXXXX"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          />
          {myFormik.errors.phone && myFormik.touched.phone && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        {buttonSubmit ? (
          <div className="flex justify-center items-center bg-green-600 rounded-lg py-2.5">
            <ThreeDots visible={true} height="23" width="40" color="white" radius="9" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg transition-all duration-300 shadow-md"
          >
            Register
          </button>
        )}

        {/* Messages */}
        {errorMessage && <p className="mt-3 text-center text-red-600">{errorMessage}</p>}
        {isSuccess && <p className="mt-3 text-center text-green-600">{isSuccess}</p>}

      </form>
    </div>
  );
}
