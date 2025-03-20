import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Profile = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <div className="min-h-screen bg-[#b5d5df] flex flex-col items-center">
      {/* Profile Picture */}
      <div className="relative w-full bg-[#0f2c36] h-32 flex justify-center items-end rounded-b-3xl">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center border-4 border-white absolute -bottom-10">
          👤
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 mt-14 w-4/5 shadow-lg">
        <label className="block font-bold mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 mb-3 bg-gray-100 rounded-md border border-gray-300"
        />

        <label className="block font-bold mb-1">Date Of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 cursor-pointer"
        />

        <label className="block font-bold mt-3 mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 cursor-pointer"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="block font-bold mt-3 mb-1">Address</label>
        <textarea
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full p-2 bg-gray-100 rounded-md border border-gray-300"
        ></textarea>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-[#0f2c36] p-3 flex justify-around text-white">
        <button onClick={() => navigate("/dashboard")} className="text-center">
          <span className="block text-xl">🏠</span>
          Home
        </button>
        <button onClick={() => navigate("/reports")} className="text-center">
          <span className="block text-xl">📊</span>
          Reports
        </button>
        <button onClick={() => navigate("/settings")} className="text-center">
          <span className="block text-xl">⚙️</span>
          Settings
        </button>
        <button onClick={() => navigate("/profile")} className="text-center">
          <span className="block text-xl">👤</span>
          Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
