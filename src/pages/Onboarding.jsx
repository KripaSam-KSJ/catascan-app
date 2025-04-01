import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Fetch current location using Geolocation API
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use OpenStreetMap's Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setFormData((prev) => ({ ...prev, address: data.display_name }));
          } else {
            setError("Unable to fetch address. Please enter manually.");
            toast.error("Unable to fetch address.");
          }
        } catch (err) {
          setError("Failed to fetch location. Please enter manually.");
          toast.error("Failed to fetch location.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        setError(
          "Failed to get location. Please allow location access or enter manually."
        );
        toast.error("Failed to get location.");
        setLoadingLocation(false);
      }
    );
  };

  // Automatically fetch location when component mounts
  useEffect(() => {
    fetchLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(formData.dob);
    if (age < 0 || age > 150) {
      setError(
        "Please enter a valid date of birth (age must be between 0 and 150)."
      );
      return;
    }

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      setError("User ID not found. Please sign up again.");
      toast.error("User ID not found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ user_id, ...formData, age }), // Include calculated age
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Onboarding failed");
      }

      navigate("/signinsuccess");
    } catch (err) {
      setError(err.message || "An error occurred during onboarding.");
      toast.error(err.message || "Onboarding failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex items-center justify-center p-6">
      <div className="bg-[#1a3c40]/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-sm shadow-lg border border-[#b3d1d6]/20">
        <h1 className="text-2xl font-bold text-[#b3d1d6] mb-6 text-center tracking-tight">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              required
            />
          </div>

          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={loadingLocation ? "Fetching location..." : "Address"}
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              disabled={loadingLocation}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-[#b3d1d6] text-[#0d2a34] rounded-xl font-semibold hover:bg-[#a1c3c8] transition-all duration-200 shadow-md"
            disabled={loadingLocation}
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
