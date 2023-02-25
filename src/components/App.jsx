import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import SignupPage from "./signup/SignupPage";
import SearchPage from "./search/SearchPage";
import LoginPage from "./login/LoginPage";
import PetDetailPage from "./pets/PetDetailPage";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/petdetails" element={<PetDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
