// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Hello from "./pages/Hello";
import Home from "./pages/Home";
import SignInSuccess from "./pages/SignInSuccess";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UploadImage from "./pages/UploadImage";
import Reports from "./pages/Reports";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signinsuccess" element={<SignInSuccess />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </Router>
  );
}

export default App;