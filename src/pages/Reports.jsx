import React from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  // Sample scan reports data
  const reports = [
    { id: 1, title: "Scan 1", date: "Feb 10, 2025" },
    { id: 2, title: "Scan 2", date: "Jan 24, 2025" },
    { id: 3, title: "Scan 3", date: "Jan 10, 2025" },
  ];

  return (
    <div className="min-h-screen bg-[#0d2a34] flex flex-col items-center">
      {/* Curved Header */}
      <div className="bg-gradient-to-b from-[#b3d1d6] to-[#6d8c94] w-full h-40 rounded-b-3xl flex items-center px-6">
        <h1 className="text-3xl font-bold text-black">Reports</h1>
      </div>

      {/* Reports List */}
      <div className="bg-[#6d8c94] p-5 mt-[-30px] rounded-2xl w-4/5 shadow-lg">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#6d8c94] text-xl font-bold">📄</span>
              <div>
                <h2 className="text-lg font-semibold">{report.title}</h2>
                <p className="text-sm text-gray-500">{report.date}</p>
              </div>
            </div>
            <span className="text-gray-600 text-xl">⋮</span>
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-[#15262e] p-3 flex justify-around border-t border-gray-600">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigate("/reports")}
          className="flex flex-col items-center text-[#38b6ff]"
        >
          <span className="text-xl">📊</span>
          <span className="text-xs">Reports</span>
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xl">⚙️</span>
          <span className="text-xs">Settings</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xl">👤</span>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Reports;
