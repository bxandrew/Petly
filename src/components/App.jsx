import React from "react";
import NavBar from "./NavBar";
import PetCardList from "./PetCardList";

const App = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="main-container">
        <div className="main-container-left">
          Main Container Component This will include the cards for my page
          <div className="slogan-container">
            <div>Find your new best friend</div>
            <div>
              Browse pets from all over the country! It only takes 60 seconds to
              find a match
            </div>
          </div>
          <div>
            <PetCardList />
          </div>
        </div>
        <div className="main-container-right">Right Container</div>
      </div>
    </>
  );
};

export default App;
