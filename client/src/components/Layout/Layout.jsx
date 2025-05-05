import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      <main className="max-w-[1400px] min-h-screen bg-gray-300 flex items-center justify-between sm:px-32 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
