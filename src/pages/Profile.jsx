import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion"; // For subtle animations

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.error || "Failed to fetch profile");

        setProfile(data.profile);
        setProfileImage(data.avatar_url || null);
      } catch (err) {
        setError(err.message || "Failed to load profile data");
        toast.error(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#b3d1d6] text-base flex items-center gap-2"
        >
          <svg
            className="animate-spin h-4 w-4 text-[#b3d1d6]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Loading
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex flex-col items-center p-6">
      {/* Profile Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <div className="w-20 h-20 bg-[#6d8c94]/20 rounded-full flex items-center justify-center border border-[#b3d1d6]/20">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl text-[#b3d1d6]">👤</span>
          )}
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#1a3c40]/80 backdrop-blur-xl p-6 mt-6 w-full max-w-md rounded-xl border border-[#b3d1d6]/20 text-[#b3d1d6]"
      >
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-400 text-sm text-center mb-4"
          >
            {error}
          </motion.p>
        )}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#b3d1d6]/90">First Name</span>
            <span>{profile?.first_name || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b3d1d6]/90">Last Name</span>
            <span>{profile?.last_name || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b3d1d6]/90">Gender</span>
            <span>{profile?.gender || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b3d1d6]/90">Date of Birth</span>
            <span>{profile?.dob || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b3d1d6]/90">Age</span>
            <span>{profile?.age || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b3d1d6]/90">Address</span>
            <span>{profile?.address || "N/A"}</span>
          </div>
        </div>
      </motion.div>

      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 w-full"
      >
        <Navbar />
      </motion.div>
    </div>
  );
};

export default Profile;
