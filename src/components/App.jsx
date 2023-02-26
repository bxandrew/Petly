import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import SignupPage from "./signup/SignupPage";
import SearchPage from "./search/SearchPage";
import LoginPage from "./login/LoginPage";
import PetDetailPage from "./pets/PetDetailPage";
import ResultsPage from "./search/ResultsPage";

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/petdetails" element={<PetDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
