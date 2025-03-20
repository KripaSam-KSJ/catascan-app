import { Home, FileText, Settings, User, ScanEye, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CataractApp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-cyan-500 flex flex-col items-center justify-center p-6">
      
      {/* Greeting Text */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        <span className="text-cyan-700">Hello</span> User...
      </h1>

      {/* Centered Blurred Box */}
      <div className="bg-white/30 backdrop-blur-lg p-10 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col items-center animate-fade-in">
        <div className="space-y-8 w-full">
          
          {/* Scan Button */}
          <div
            className="bg-cyan-600 p-8 rounded-xl text-white shadow-lg cursor-pointer text-center flex flex-col items-center gap-2 transition-transform transform hover:scale-105 hover:bg-cyan-700"
            onClick={() => navigate("/upload-image")}
          >
            <ScanEye size={32} className="text-white" />
            <h2 className="text-2xl font-bold">Scan</h2>
            <p className="text-base">Generate Report Based on Image Analysis</p>
          </div>

          {/* Insight Button */}
          <div
            className="bg-blue-600 p-8 rounded-xl text-white shadow-lg cursor-pointer text-center flex flex-col items-center gap-2 transition-transform transform hover:scale-105 hover:bg-blue-700"
            onClick={() => navigate("/insight")}
          >
            <Lightbulb size={32} className="text-white" />
            <h2 className="text-2xl font-bold">Insight</h2>
            <p className="text-base">Know more about Cataract.</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 p-5 flex justify-around text-white shadow-lg">
        <button className="flex flex-col items-center hover:text-cyan-300" onClick={() => navigate("/dashboard")}>
          <Home size={24} />
          <span className="text-sm">Home</span>
        </button>
        <button className="flex flex-col items-center hover:text-cyan-300" onClick={() => navigate("/reports")}>
          <FileText size={24} />
          <span className="text-sm">Reports</span>
        </button>
        <button className="flex flex-col items-center hover:text-cyan-300" onClick={() => navigate("/settings")}>
          <Settings size={24} />
          <span className="text-sm">Settings</span>
        </button>
        <button className="flex flex-col items-center hover:text-cyan-300" onClick={() => navigate("/profile")}>
          <User size={24} />
          <span className="text-sm">Profile</span>
        </button>
      </nav>
    </div>
  );
}
