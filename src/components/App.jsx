import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import LoginSignupPage from "./signup/LoginSignupPage";
import SearchPage from "./search/SearchPage";
import PetDetailPage from "./pets/PetDetailPage";
import ResultsPage from "./search/ResultsPage";
import testData from "./testdata";
// console.log("Our test data", testData);

const App = () => {
  const [animalData, setAnimalData] = useState(testData);
  // console.log("Data received in App.jsx", animalData);

  return (
    <div className="app-container">
      <NavBar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login_signup" element={<LoginSignupPage />} />
          <Route
            path="/search"
            element={<SearchPage setAnimalData={setAnimalData} />}
          />
          <Route
            path="/results"
            element={<ResultsPage animalData={animalData} />}
          />
          <Route path="/petdetails" element={<PetDetailPage />} />
          {/* <Route path="/*" element={<ErrorRoute />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
