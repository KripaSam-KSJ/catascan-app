import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Modern Checkmark Icon

const SignInSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SignInSuccess Mounted. Redirecting in 3 seconds...");
    const timer = setTimeout(() => {
      console.log("Redirecting to Home...");
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6d8c94]">
      <div className="w-4/5 h-4/5 bg-white/20 backdrop-blur-xl p-16 rounded-3xl text-center shadow-2xl border border-white/30 flex flex-col items-center justify-center animate-fade-in">
        
        {/* Success Icon with Animation */}
        <div className="flex justify-center items-center mb-8 relative">
          <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
          <div className="absolute w-28 h-28 border-dotted border-4 border-green-400 rounded-full animate-ping"></div>
        </div>

        {/* Success Message */}
        <h2 className="text-4xl font-bold text-white">Sign In Successful!</h2>
        <p className="text-gray-100 mt-4 text-lg">Redirecting to Dashboard...</p>

        {/* Subtle Loading Bar */}
        <div className="w-2/3 bg-gray-500/30 h-2.5 mt-6 rounded-full overflow-hidden shadow-inner">
          <div className="h-2.5 bg-green-400 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SignInSuccess;
