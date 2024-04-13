import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-md p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg mb-6">Thank you for your purchase.</p>
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
