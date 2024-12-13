import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12">
        <h1 className="text-5xl font-bold text-yellow-600 mb-4">404 - Oops! Page Not Found 😱</h1>
        <p className="text-xl text-gray-700 mb-16">
          Looks like you're lost in the digital campus. The page you're looking for doesn't exist!
        </p>
        <img
          src="https://via.placeholder.com/300x200?text=404+Oops"
          alt="404 Error"
          className="mx-auto mt- mb-6 animate-bounce"
        />
        <p className="text-lg text-gray-600 mb-6">
          Maybe it went on vacation? Or got kicked out for not following the rules.
        </p>
        <div className="mb-6">
          <p className="text-xl text-gray-700">Don't worry, you can go back to safety:</p>
          <Link
            to="/"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 mt-4 inline-block"
          >
            Take Me Home, Professor! 🏡
          </Link>
        </div>
        <div className="text-sm text-gray-500">
          <p>Or you can just blame the system for this one... 🤷‍♂️</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
