import React from "react";

function Home() {
  const handleGoogleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 mb-4 bg-gray-400 hover:bg-gray-500 rounded flex items-center justify-center transition-colors cursor-pointer"
      >
        Login with Google
      </button>
    </div>
  );
}

export default Home;
