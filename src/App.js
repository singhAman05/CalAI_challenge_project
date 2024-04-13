import React from "react";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import Product from "../src/screens/Product";
import AuthPage from "../src/screens/SignUp";
import PaymentFailPage from "./screens/PaymentFail";
import SuccessPage from "./screens/PaymentSuccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Product} />
        <Route path="/login" Component={AuthPage} />
        <Route path="/success" Component={SuccessPage} />
        <Route path="/cancel" Component={PaymentFailPage} />
      </Routes>
    </>
  );
}

export default App;
