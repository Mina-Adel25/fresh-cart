import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { authcontext } from '../../Context/AuthContext';
import img from '../../assets/images/computer-login-animate.svg'

export default function Login() {
  const { setToken } = useContext(authcontext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = { email: '', password: '' };

  async function Submit(values) {
    setButtonSubmit(true);
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(function (res) {
        setIsSuccess(res.data.user.name);

        localStorage.setItem('tok', res.data.token);
        setToken(res.data.token);

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      })
      .catch(function (err) {
        setButtonSubmit(false);
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2500);
      });
  }

  const myFormik = useFormik({
    initialValues: user,
    onSubmit: Submit,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email must contain '@' and '.'")
        .required('Email is Required'),
      password: yup
        .string()
        .min(6, 'Minimum must be 6 characters')
        .max(12, 'Password must be max 12 characters')
        .required('Password is Required'),
    }),
  });

  return (
    <div className="md:flex justify-center items-center md:h-[82vh] bg-gradient-to-br  px-3 mt-4 md:mt-0">
      <div className="md:w-1/3">
            <img src={img} alt="" className='w-full md:h-auto' />
            </div>
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl pt-0 md:pt-8 p-8"
        onSubmit={myFormik.handleSubmit}
      >

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800  mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500  text-center mb-6">
          Please login to your account
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50  ">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="text-center p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-100">
            Welcome {isSuccess}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 0"
          >
            Email address
          </label>
          <input
            value={myFormik.values.email}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-green-500 focus:border-green-500 block w-full p-2.5
             "
          />
          {myFormik.errors.email && myFormik.touched.email && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            value={myFormik.values.password}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-green-500 focus:border-green-500 block w-full p-2.5
             "
          />
          <i
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute top-10 right-3 text-gray-400 cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
          {myFormik.errors.password && myFormik.touched.password && (
            <p className="mt-2 text-sm text-red-600">{myFormik.errors.password}</p>
          )}
        </div>
        <div className="text-right mb-5">
          <Link to="/forgot-password" className="text-green-600 hover:underline">
            Forgot Password 
          </Link>
        </div>

        {/* Submit Button */}
        {buttonSubmit ? (
          <div className="flex justify-center items-center bg-green-600 rounded-lg py-2.5">
            <ThreeDots
              visible={true}
              height="23"
              width="40"
              color="white"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 
              hover:from-green-700 hover:to-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
              rounded-lg transition-all duration-300 shadow-md"
          >
            Login
          </button>
        )}

        {/* Register Link */}
        <p className="mt-6 text-sm text-center text-gray-500 ">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-600 hover:text-green-700 "
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
