import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const CourseCard = ({ title, category, price, linkImg }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/create-order", {
        amount: price,
      });
      const approvalUrl = response.data.approvalUrl;
      window.location.href = approvalUrl;
    } catch (error) {
      console.log("Error in payment", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else {
      setLoading(true);
      await handlePayment();
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <Loader />
        </div>
      ) : null}
      <div
        className={`bg-white drop-shadow-md overflow-hidden my-4 mr-2 ${
          loading ? "hidden" : ""
        }`}
      >
        <>
          <img
            src={linkImg}
            alt="courses"
            className="h-40 w-full object-cover"
          />
          <div className="p-5">
            <h1 className="py-2 truncate">{title}</h1>
          </div>
          <h3 className="p-5 text-xl bottom-0">${price}</h3>
          <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
            {category}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-5 right-5 transition-all duration-300 ease-in-out"
            onClick={handleBuy}
          >
            Buy
          </button>
        </>
      </div>
    </>
  );
};

export default CourseCard;
