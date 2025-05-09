import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Navbar from "./components/Layout/Navbar";
import Login from "./pages/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgetPassword";

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/api/auth/success' element={<Navbar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
