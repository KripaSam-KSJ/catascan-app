import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user types
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!formData.email.includes("@")) newErrors.email = "Email must contain an '@' symbol";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the Terms & Conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6d8c94] to-[#6d8c94] px-6">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 text-gray-800">
        <h1 className="text-3xl font-bold text-gray-700 text-center">Create A New Account</h1>

        <div className="space-y-5 mt-6">
          {[  
            { label: "User Name", name: "username", type: "text", icon: <FaUserAstronaut />, placeholder: "Enter User-Name" },
            { label: "Email", name: "email", type: "email", icon: <MdOutlineMail />, placeholder: "Enter Email Address" },
            { label: "Phone Number", name: "phone", type: "tel", icon: <IoCallOutline/>, placeholder: "Enter Phone Number" },
            { label: "Password", name: "password", type: "password", icon: <CiLock/>, placeholder: "Enter Password" }
          ].map(({ label, name, type, icon, placeholder }) => (
            <div key={name} className="text-left">
              <label className="block text-sm font-medium text-gray-600">{label}</label>
              <div className="flex items-center bg-white/40 backdrop-blur-md p-3 rounded-lg mt-1 shadow-md">
                <span className="text-gray-400 mr-3">{icon}</span>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}

          <div className="flex items-center text-gray-600 text-sm">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              className="w-4 h-4 accent-[#1a3c40]"
            />
            <label className="ml-2">Accept the Terms & Conditions</label>
          </div>
          {errors.acceptedTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptedTerms}</p>}

          <button 
            onClick={handleSubmit} 
            className="w-full p-3 rounded-lg text-lg font-semibold transition-all duration-300 
                       bg-[#1a3c40] text-white hover:bg-[#145c5a] hover:scale-105 shadow-lg">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
