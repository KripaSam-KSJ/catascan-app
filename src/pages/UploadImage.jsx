import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaCog, FaUser, FaCamera, FaUpload } from "react-icons/fa";

const UploadImage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d2a34] flex flex-col items-center">
      {/* Header */}
      <h1 className="text-white text-2xl font-bold mt-8">Upload Image Of Your Eye</h1>

      {/* Upload Box */}
      <div className="bg-[#b3d1d6] w-64 h-64 rounded-2xl flex items-center justify-center mt-5 shadow-lg">
        <button className="text-gray-700 text-lg flex flex-col items-center">
          <FaCamera className="text-2xl mb-2" />
          Capture Image
        </button>
      </div>

      {/* Upload from Gallery */}
      <button className="bg-[#b3d1d6] w-64 mt-5 py-2 rounded-full flex items-center justify-center shadow-md">
        <FaUpload className="mr-2" />
        Upload From Gallery
      </button>

      {/* Divider */}
      <div className="w-4/5 border-b border-gray-500 my-5"></div>

      {/* Scan Button */}
      <button
        onClick={() => navigate("/scan-results")}
        className="bg-[#b3d1d6] w-64 py-3 rounded-xl text-black font-bold text-lg shadow-lg"
      >
        SCAN
      </button>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-[#15262e] p-3 flex justify-around border-t border-gray-600">
        {/* 🏠 Home Button: Navigates to Dashboard */}
        <button onClick={() => navigate("/")} className="flex flex-col items-center text-white">
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </button>

        <button onClick={() => navigate("/reports")} className="flex flex-col items-center text-white">
          <FaChartLine className="text-xl" />
          <span className="text-xs">Reports</span>
        </button>

        <button onClick={() => navigate("/settings")} className="flex flex-col items-center text-white">
          <FaCog className="text-xl" />
          <span className="text-xs">Settings</span>
        </button>

        <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-white">
          <FaUser className="text-xl" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
