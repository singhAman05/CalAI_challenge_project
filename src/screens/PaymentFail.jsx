import React from "react";
import { Link } from "react-router-dom";

const PaymentFailPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-md p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="text-lg mb-6">
          We're sorry, your payment could not be processed. The amount will be
          refunded in 2-3 business days.
        </p>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailPage;
