import React from "react";
import heroImg from "../../images/heroImg.png";

const Hero = () => {
  return (
    <section className="w-full bg-white py-24 p-4">
      <div className="md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]">
        <div className="flex flex-col justify-start gap-4">
          <p className="py-2 text-4xl text-[#2898dd] font-bold">
            START TO SUCCESS
          </p>
          <h1 className="md:leading-[42px] py-2 md:text-3xl text-lg font-semibold">
            Access to over <span className="text-[#208486]">1000</span> courses
            from over <span className="text-[#208486]">200</span> professional
            instructors & institutions
          </h1>
          <p className="py-2 text-lg text-gray-900">
            Various versions have evolved over the years
          </p>
          <form className="input-box-shadow flex justify-content-between items-center bg-transparent gap-2">
            <input
              type="text"
              className="my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500"
              placeholder="search for courses here"
            />
            <button className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Search
            </button>
          </form>
        </div>
        <img src={heroImg} alt="hero" className="md:order-last order-first" />
      </div>
    </section>
  );
};

export default Hero;
