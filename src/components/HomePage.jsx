import React from "react";
import NavBar from "./NavBar";
import PetCardList from "./PetCardList";

const HomePage = () => {
  return (
    <>
      {/* <div>
        <NavBar />
      </div> */}
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
        <div className="main-container-right">
          <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80"></img>
        </div>
      </div>
    </>
  );
};

export default HomePage;
