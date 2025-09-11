import React, { useState, useEffect } from 'react';
import Navber from './../Navber/Navber';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import img from "../../assets/images/no-connection-animate (1).svg";

export default function Layout() {
  const [showButton, setShowButton] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Scroll to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <Navber />

      {isOnline ? (
        <div className="pt-20">
          <Outlet />
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center text-center px-4">
          <img
            src={img}
            alt="No Internet"
            className="w-96 md:w-1/2 lg:w-1/3 max-w-full mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-700">
            No Internet Connection
          </h2>
          <p className="text-gray-500  mt-2">
            Please check your network and try again
          </p>
          <p className="text-xs text-gray-400 mt-4">
            <a
              href="https://storyset.com/online"
              target="_blank"
              rel="noopener noreferrer"
            >
              Online illustrations by Storyset
            </a>
          </p>
        </div>
      )}

      <Footer />

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-4 opacity-50 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 hover:opacity-85 duration-500 transition animate-bounce z-50"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}
