import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import LoginSignupPage from "./signup/LoginSignupPage";
import SearchPage from "./search/SearchPage";
import PetDetailPage from "./pets/PetDetailPage";
import ResultsPage from "./search/ResultsPage";
import MyListPage from "./search/MyListPage";
import testData from "./testdata";
// console.log("Our test data", testData);

const App = () => {
  const [animalData, setAnimalData] = useState(testData.animals);
  const [nextPage, setNextPage] = useState({}); //takes an object with href and string
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set login state
  const [session, setSession] = useState("");
  console.log(session);
  console.log(isLoggedIn);
  // console.log("Next page state data:", nextPage);

  return (
    <div className="app-container">
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setSession={setSession}
      />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login_signup"
            element={
              <LoginSignupPage
                setIsLoggedIn={setIsLoggedIn}
                setSession={setSession}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                animalData={animalData}
                setAnimalData={setAnimalData}
                setNextPage={setNextPage}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsPage
                animalData={animalData}
                setAnimalData={setAnimalData}
                nextPage={nextPage}
                setNextPage={setNextPage}
                session={session}
              />
            }
          />
          <Route path="/mylist" element={<MyListPage session={session} />} />
          <Route path="/petdetails" element={<PetDetailPage />} />
          {/* <Route path="/*" element={<ErrorRoute />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
