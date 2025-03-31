import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:5000/scans", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch reports");
        }

        setReports(data);
      } catch (err) {
        toast.error(err.message || "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex items-center justify-center p-6">
        <div className="text-[#b3d1d6] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2a34] to-[#6d8c94] flex flex-col items-center p-6">
      <div className="w-full bg-[#1a3c40]/80 backdrop-blur-xl h-32 rounded-b-2xl flex items-center justify-center shadow-lg border-b border-[#b3d1d6]/20">
        <h1 className="text-3xl font-bold text-[#b3d1d6] tracking-tight">
          Reports
        </h1>
      </div>

      <div className="bg-[#1a3c40]/80 backdrop-blur-xl p-6 mt-8 w-full max-w-md rounded-2xl shadow-lg border border-[#b3d1d6]/20">
        {reports.length === 0 ? (
          <p className="text-[#b3d1d6] text-center">No reports available.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report.scan_id}
              className="flex items-center justify-between bg-[#6d8c94]/20 p-4 rounded-xl mb-4 shadow-md hover:bg-[#6d8c94]/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#b3d1d6] text-xl">📄</span>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Scan {report.scan_id.slice(0, 8)}
                  </h2>
                  <p className="text-sm text-[#b3d1d6]/80">
                    {report.created_at}
                  </p>
                </div>
              </div>
              <span
                className="text-[#b3d1d6] text-xl cursor-pointer"
                onClick={() =>
                  navigate("/scan-results", {
                    state: {
                      result: {
                        scan_id: report.scan_id,
                        prediction:
                          report.severity_level !== "None"
                            ? "Cataract"
                            : "No Cataract",
                        confidence: 75, // Placeholder; ideally fetch from analysis
                        severity: report.severity_level,
                        feedback: report.feedback,
                        recommendation: report.recommendation || "N/A",
                      },
                    },
                  })
                }
              >
                ⋮
              </span>
            </div>
          ))
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default Reports;
