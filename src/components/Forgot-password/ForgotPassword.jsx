import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdEmail } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import img from '../../assets/images/forgot-password-animate.svg'

export default function ForgotPassword() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);

    function forgotPassword(values) {
        setIsLoading(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            .then(function (res) {
                navigate("/verify-code")
                setIsLoading(false)
                toast.success("success")

            })
            .catch(function (ero) {
                setIsLoading(false)
                toast.error("error")
                seterrorMessage(ero.response.data.message )

            })
    }


    const myFormik = useFormik({
        initialValues: { email: "" },
        onSubmit: forgotPassword,
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email("Email must contain '@' and '.'")
                .required('Email is Required'),
        }),
    });

    return (
        <div className="md:flex justify-center items-center md:h-[82vh] bg-gradient-to-br px-3 mt-4 md:mt-0">
            <div className="md:w-1/3">
            <img src={img} alt="" className='w-full ' />
            </div>
            <form
                className='w-full  max-w-2xl bg-white rounded-2xl shadow-2xl md:ms-5 pt-0 p-8'
                onSubmit={myFormik.handleSubmit}
            >

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800  mb-2">
                    Forgot Password 
                </h2>


                {/* Error Message */}
                {errorMessage && (
                    <div className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50/30  ">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
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
                   focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    />

                    {myFormik.errors.email && myFormik.touched.email && (
                        <p className="mt-2 text-sm text-red-600">{myFormik.errors.email}</p>
                    )}

                </div>
                {isLoading ?
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
                    :
                    <button
                        type="submit"
                        className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 
                         hover:from-green-700 hover:to-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
                          rounded-lg transition-all duration-300 shadow-md"
                    >
                        Next
                    </button>
                }


            </form >
        </div >
    )
}
