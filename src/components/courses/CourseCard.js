import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const CourseCard = ({ title, category, price, linkImg }) => {
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
    if (!user) {
      // User is not signed in, redirect to login page
      navigate("/login");
      return;
    }

    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        `http://localhost:5000/create-checkout-session`,
        {
          title,
          category,
          price,
          linkImg,
        }
      );

      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white drop-shadow-md overflow-hidden my-4 mr-2">
      <img src={linkImg} alt="courses" className="h-40 w-full object-cover" />
      <div className="p-5">
        <h1 className="py-2 truncate">{title}</h1>
      </div>
      <h3 className="p-5 text-xl bottom-0">${price}</h3>
      <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
        {category}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-5 right-5 transition-all duration-300 ease-in-out"
        onClick={handlePayment}
      >
        Buy
      </button>
    </div>
  );
};

export default CourseCard;
