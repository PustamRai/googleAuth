import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useAuthContext();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-50 sm:px-32 max-w-[1400px] mx-auto shadow-sm fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="flex items-center">
        <span className="font-semibold text-lg cursor-pointer">Auth</span>
      </Link>

      {user ? (
        <div className="flex justify-between items-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-full w-10 h-10 mx-auto mt-4"
          />
        </div>
      ) : (
        <button className="px-4 py-2 rounded border border-blue-300 hover:bg-blue-500 transition-colors cursor-pointer">
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
