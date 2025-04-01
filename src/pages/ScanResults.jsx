import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaDownload, FaEye } from "react-icons/fa";
import Navbar from "../components/Navbar";

const ScanResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result || {};

  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

  const handleDownloadPDF = async () => {
    if (!result.scan_id) {
      console.error("No scan_id available");
      return;
    }

    // Retrieve the access token from localStorage
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found. Please sign in again.");
      navigate("/signin"); // Redirect to sign-in if no token
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/download_report?scanId=${result.scan_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download report");
      }

      // Handle the PDF response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `catascan_report_${result.scan_id}.pdf`; // Match backend filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Error downloading report:", error.message);
      alert("Failed to download report: " + error.message);
    }
  };

  if (!state?.result) {
    return (
      <div className="min-h-screen bg-[#0d2a34] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <FaEye className="text-4xl mx-auto mb-4" />
          <p className="text-lg">No results available.</p>
          <button
            onClick={() => navigate("/upload-image")}
            className="mt-4 bg-[#b3d1d6] text-[#0d2a34] py-2 px-6 rounded-xl font-semibold hover:bg-[#a1c3c8] transition-colors"
          >
            Upload Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2a34] to-[#6d8c94] flex flex-col items-center justify-center p-6">
      <div className="bg-[#1a3c40]/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-lg border border-[#b3d1d6]/20">
        <h1 className="text-2xl font-bold text-[#b3d1d6] mb-6 flex items-center gap-2">
          <FaEye /> Scan Results
        </h1>

        <div className="space-y-6 text-white">
          <div className="flex justify-between">
            <span className="font-medium">Prediction</span>
            <span className="font-bold text-[#b3d1d6]">
              {result.prediction}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Confidence</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-[#6d8c94]/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#b3d1d6]"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <span>{result.confidence.toFixed(2)}%</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Severity</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                result.severity === "None"
                  ? "bg-green-500/20 text-green-300"
                  : result.severity === "Mild to Moderate"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {result.severity}
            </span>
          </div>
          <div>
            <span className="font-medium block mb-2">Feedback</span>
            <p className="bg-[#6d8c94]/20 p-3 rounded-xl text-sm">
              {result.feedback}
            </p>
          </div>
          <div>
            <span className="font-medium block mb-2">Recommendation</span>
            <p className="bg-[#6d8c94]/20 p-3 rounded-xl text-sm">
              {result.recommendation}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="mt-6 w-full bg-[#b3d1d6] text-[#0d2a34] py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-[#a1c3c8] transition-colors"
        >
          <FaDownload /> Download Report
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default ScanResults;
