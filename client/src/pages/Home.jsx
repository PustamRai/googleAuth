import React from "react";
import { Link } from "react-router-dom"

function Home() {

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <Link
        to='/login'
        className="w-full py-3 mb-4 bg-gray-400 hover:bg-gray-500 rounded flex items-center justify-center transition-colors cursor-pointer"
      >
        Login with Google
      </Link>
    </div>
  );
}

export default Home;
