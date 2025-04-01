import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#6d8c94] px-6 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Hello User!!
      </h1>
      <p className="text-gray-700 text-lg max-w-2xl leading-relaxed">
        <span className="font-semibold text-gray-900">CataScan</span> is a
        <span className="font-semibold text-gray-900">
          {" "}
          User-Friendly WebApp
        </span>{" "}
        that helps in the early detection of cataract using images taken from
        your phone.
      </p>
      <div className="mt-8 flex space-x-6">
        <button
          className="bg-[#1a3c40] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-[#3a506b] hover:scale-105"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
        <button
          className="bg-gray-300 text-gray-800 text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-gray-400 hover:scale-105"
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
