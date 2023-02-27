import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import LoginSignupPage from "./signup/LoginSignupPage";
import SearchPage from "./search/SearchPage";
import PetDetailPage from "./pets/PetDetailPage";
import ResultsPage from "./search/ResultsPage";

const App = () => {
  const [test, setTest] = useState("");
  console.log(test);

  const handleClick = (e, value) => {
    setTest(value);
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login_signup"
            element={<LoginSignupPage test={test} />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/petdetails" element={<PetDetailPage />} />
          {/* <Route path="/*" element={<ErrorRoute />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
