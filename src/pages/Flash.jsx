import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Flash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex items-center justify-center p-6">
      <div className="bg-[#1a3c40]/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-[#b3d1d6]/20 transform transition-all hover:scale-102 duration-300">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#b3d1d6] tracking-tight animate-fade-in">
            Cata<span className="text-white">Scan</span>
          </h1>
          <p className="text-[#b3d1d6] mt-4 text-lg opacity-80 animate-fade-in delay-200">
            Early Detection, Modern Care
          </p>
          <div className="mt-6 w-10 h-10 mx-auto border-4 border-[#b3d1d6]/50 border-t-[#b3d1d6] rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default Flash;
