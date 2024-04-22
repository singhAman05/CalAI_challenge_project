import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const SuccessPage = () => {
  useEffect(() => {
    const captureOrder = async () => {
      try {
        // Get the orderId from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("token");
        console.log(orderId);
        if (!orderId) {
          console.error("Order ID not found in URL.");
          return;
        }

        // Capture the order
        const captureResponse = await axios.post(
          "http://localhost:5000/capture-order",
          {
            orderId: orderId,
          }
        );

        console.log("Order Captured:", captureResponse.data);

        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userEmail = user.email;
            console.log("User email:", userEmail);
            // Send a thank you email to the user
            await axios.post("http://localhost:5000/send-email", {
              email: userEmail,
            });
            // Store capture response data in Firestore
            const db = getFirestore();
            const orderRef = collection(db, "orders");
            await addDoc(orderRef, {
              userId: user.uid,
              orderId: orderId,
              captureResponse: captureResponse.data,
              userEmail: userEmail,
              timestamp: new Date(),
            });

            alert("Your payment has been Successful");
          } else {
            console.error("User not logged in.");
          }
        });
      } catch (error) {
        console.error("Error capturing order:", error.message);
        // Handle error as needed
      }
    };

    captureOrder(); // Call the function when the component mounts
  }, []); // Empty dependency array to run only once on mount

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
