import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:8000/api/auth/google', '_self');
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", { email, password });
  };

  return (
    <div className="min-h-screen mt-20 py-6 flex flex-col items-center justify-center p-4 w-full">
      <div className="sm:max-w-sm md:max-w-md lg:max-w-lg  rounded-lg  p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Get started with Google Auth
        </h1>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-6">
          <button
            className="w-full flex items-center justify-center gap-3 py-3 px-5  border-1 border-gray-800 rounded-md  bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-200 text-gray-500">OR</span>
          </div>
        </div>

        {/* signup Form */}
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border-1 border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                Show
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-1 border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* signup Button */}
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors cursor-pointer"
          >
            Sign up
          </button>

          {/* Links */}
          <div className="flex flex-col justify-center items-center gap-2 sm:flex-row  pt-2 space-y-2 ">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
