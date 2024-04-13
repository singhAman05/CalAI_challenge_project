import React, { useState } from "react";
import { app, googleAuthProvider } from "../firebase/firebase";
import CTA from "../images/achievement.png";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const AuthPage = () => {
  const auth = getAuth(app);
  const [isSignup, setIsSignup] = useState(false); // Changed to false initially
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleAuthAction = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // Signup
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User signed up:", user);
      } else {
        // Login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User logged in:", user);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Authentication error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleRegister = () => {
    setIsSignup(true);
  };

  const handleLogin = () => {
    setIsSignup(false);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform registration logic here
      console.log(
        "Registration submitted:",
        name,
        email,
        phoneNumber,
        password
      );
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Registration error:", error.message);
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">
              {isSignup ? "Register" : "Login"}
            </h2>
            <p className="text-xs mt-4 text-[#002D74]">
              {isSignup
                ? "If you don't have an account, easily register"
                : "If you already have an account, easily log in"}
            </p>

            <form
              onSubmit={isSignup ? handleRegistrationSubmit : handleAuthAction}
              className="flex flex-col gap-4"
            >
              {isSignup && (
                <>
                  <input
                    className="p-2 mt-4 rounded-xl border"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="p-2  rounded-xl border"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </>
              )}
              <input
                className="p-2 mt-2 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  {/* Eye icon SVG */}
                </svg>
              </div>
              <p>{errorMessage}</p>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                {isSignup ? "Register" : "Login"}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <button
              className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
              <a href="/">Forgot your password?</a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>
              <button
                onClick={isSignup ? handleLogin : handleRegister}
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                {isSignup ? "Login" : "Register"}
              </button>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={CTA} alt="signupImage" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
