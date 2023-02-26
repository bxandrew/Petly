import React from "react";
import PetCardList from "./PetCardList";
import "./resultspage.scss";

const ResultsPage = () => {
  return (
    <div className="results-container">
      <h1>Your ready to adopt matches!</h1>
      <PetCardList />
    </div>
  );
};

export default ResultsPage;
