import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Courses from "../components/courses/Courses";
import Achievement from "../components/achievement/Achievement";
import FeedBack from "../components/feedback/Feedback";
const Product = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Courses />
      <Achievement />
      <FeedBack />
      <Footer />
    </div>
  );
};

export default Product;
