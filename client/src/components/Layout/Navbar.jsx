import React from "react";

function Navbar() {

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-50 sm:px-32 max-w-[1400px] mx-auto shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <span className="font-semibold text-lg cursor-pointer">Auth</span>
      </div>
      <button className="px-4 py-2 rounded border border-blue-300 hover:bg-blue-500 transition-colors cursor-pointer">
        Login
      </button>
    </nav>
  );
}

export default Navbar;
