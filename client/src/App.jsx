import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Navbar from "./components/Layout/Navbar";

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/api/auth/success' element={<Navbar />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
