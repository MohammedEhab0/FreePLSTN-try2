import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login-Registration/LoginPage.jsx";
import RegistrationPage from "./Pages/Login-Registration/RegistrationPage.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import CreateExamPage from "./Pages/CreateExamPage.jsx";
import UploadExamPage from "./Pages//UploadExam/UploadExamPage.jsx";
import DarkVariantExample from "./Pages/GradeExamsSlide/GradeExamsSlide.jsx";
import ViewResultsPage from "./Pages/ViewResults/ViewResultsPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import Navbar from "./Pages/Navbar/Navbar.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import LandingPage from "./Pages/Landing/LandingPage.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/LandingPage" && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-exam" element={<CreateExamPage />} />
        <Route path="/upload-exam" element={<UploadExamPage />} />
        <Route path="/grade-exams" element={<DarkVariantExample />} />
        <Route path="/grade-exams-slide" element={<DarkVariantExample />} />
        <Route path="/view-results" element={<ViewResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/" exact element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
