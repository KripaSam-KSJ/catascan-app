import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PreviousScans = () => {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
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
          throw new Error(data.error || "Failed to fetch scans");
        }

        setScans(data);
      } catch (err) {
        toast.error(err.message || "Failed to load previous scans.");
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-[#b3d1d6] mb-4 tracking-tight">
        Previous Scans
      </h2>
      {loading ? (
        <div className="text-[#b3d1d6] text-center">Loading scans...</div>
      ) : scans.length === 0 ? (
        <div className="text-[#b3d1d6] text-center">
          No previous scans found.
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-[#b3d1d6]/50 scrollbar-track-[#1a3c40]/50">
          {scans.map((scan) => (
            <div
              key={scan.scan_id}
              className="flex-shrink-0 w-64 bg-[#1a3c40]/80 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-[#b3d1d6]/20 hover:bg-[#1a3c40]/90 transition-all duration-200 cursor-pointer"
              onClick={() =>
                navigate("/scan-results", {
                  state: {
                    result: {
                      scan_id: scan.scan_id,
                      prediction:
                        scan.severity_level !== "None"
                          ? "Cataract"
                          : "No Cataract",
                      confidence: 75, // Placeholder; ideally fetch from analysis
                      severity: scan.severity_level,
                      feedback: scan.feedback,
                      recommendation: scan.recommendation || "N/A",
                    },
                  },
                })
              }
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#b3d1d6] text-xl">📄</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Scan {scan.scan_id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-[#b3d1d6]/80">{scan.created_at}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">Severity</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    scan.severity_level === "None"
                      ? "bg-green-500/20 text-green-300"
                      : scan.severity_level === "Mild to Moderate"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {scan.severity_level}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousScans;
