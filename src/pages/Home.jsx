import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/hello'); // Redirect after 8 seconds
    }, 3000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a3c40] to-[#3a506b]">
      <div className="text-center">
        {/* Glowing Text Animation */}
        <h1 className="text-6xl font-extrabold text-[#a8ffb3] tracking-wide animate-pulse drop-shadow-lg">
          <span className="text-[#b4ff9f]">CATA</span>
          <span className="text-[#d4ffb5]">SCAN</span>
        </h1>

        {/* Subtext with Smooth Fade-in */}
        <p className="text-[#c8ffb0] mt-3 text-lg opacity-90 animate-fadeIn">
          Your vision, our priority.
        </p>

        {/* Animated Loading Indicator */}
        <div className="mt-5 flex justify-center">
          <div className="w-10 h-10 border-4 border-[#c8ffb0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

