import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError("Email must contain '@'");
      return;
    }
    setEmailError(""); // Clear error if valid
    navigate("/signinsuccess");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6d8c94] px-4">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 text-gray-800 text-center">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Welcome <span className="text-[#1a3c40]">Back</span>!</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to continue</p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignIn}>
          
          {/* Email Field */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-1 shadow-sm">
              <span className="text-gray-400 mr-2">📧</span>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Password Field */}
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-1 shadow-sm">
              <span className="text-gray-400 mr-2">🔒</span>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter Password"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex justify-between text-xs text-gray-500">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-cyan-500" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="hover:underline text-cyan-500">Forgot Password?</a>
          </div>

          {/* Sign-in Button */}
          <button 
            type="submit"
            className={`w-full p-3 rounded-lg text-lg font-semibold transition-all duration-300 
              ${isClicked ? 'bg-[#3a506b] text-[#1a3c40] scale-95' : 'bg-[#1a3c40] text-white hover:bg-[#3a506b] hover:text-[#1a3c40] hover:scale-105'}`}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate("/signup")} 
              className="text-[#1a3c40] font-medium hover:underline cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
