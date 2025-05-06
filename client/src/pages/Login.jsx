import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");

  const handleGoogleLogin = () => {
    const baseURL = import.meta.env.VITE_BACKEND_URI;
    window.open(`${baseURL}/api/auth/google`, "_self");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-gray-100 rounded-lg shadow-lg p-5 sm:p-6">
        <h2 className="text-xl text-center mb-6 font-medium">Welcome Back</h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 mb-4 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center transition-colors cursor-pointer"
        >
          Login with Google
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-100 text-gray-700">or</span>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-300 rounded border border-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="text-right mb-4">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded font-medium transition-colors cursor-pointer">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Login;
