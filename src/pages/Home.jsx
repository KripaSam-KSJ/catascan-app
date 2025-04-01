import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#1a3c40]/90 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md border border-[#b3d1d6]/30 text-[#b3d1d6] shadow-lg shadow-[#0d2a34]/40"
      >
        <h1 className="text-3xl font-bold text-[#b3d1d6] mb-4 text-center tracking-wide">
          Welcome to CataScan!
        </h1>
        <p className="text-[#b3d1d6]/90 text-base leading-relaxed text-center mb-6">
          <span className="font-semibold">CataScan</span> is an advanced web app
          designed for early cataract detection. Using smart image analysis, it
          helps users monitor eye health conveniently from their smartphones.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            className="w-full py-3 bg-[#b3d1d6] text-[#0d2a34] rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-[#d3e6ea] focus:ring-2 focus:ring-[#b3d1d6]/50"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
          <button
            className="w-full py-3 bg-transparent text-[#b3d1d6] rounded-xl font-semibold text-lg border border-[#b3d1d6]/30 transition-all duration-200 hover:bg-[#b3d1d6]/20 focus:ring-2 focus:ring-[#b3d1d6]/50"
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
