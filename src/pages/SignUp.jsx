import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes("@") || formData.password.length < 6) {
      setError("Please enter a valid email and a password (min 6 characters).");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sign-up failed");
      }

      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("access_token", data.access_token);
      toast.success("Sign-up successful!");
      navigate("/onboarding");
    } catch (err) {
      setError(err.message || "An error occurred during sign-up.");
      toast.error(err.message || "Sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex items-center justify-center p-6">
      <div className="bg-[#1a3c40]/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-sm shadow-lg border border-[#b3d1d6]/20">
        <h1 className="text-2xl font-bold text-[#b3d1d6] mb-6 text-center tracking-tight">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 bg-[#6d8c94]/20 text-white placeholder-[#b3d1d6]/50 rounded-xl border border-[#b3d1d6]/20 focus:outline-none focus:ring-2 focus:ring-[#b3d1d6] transition-all"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-[#b3d1d6] text-[#0d2a34] rounded-xl font-semibold hover:bg-[#a1c3c8] transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>

          <p className="text-[#b3d1d6] text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="underline cursor-pointer hover:text-white transition-colors"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
