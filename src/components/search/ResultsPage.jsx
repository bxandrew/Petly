import React from "react";
import PetCard from "./PetCard";
import "./resultspage.scss";

const ResultsPage = ({ animalData }) => {
  console.log("ResultsPage, data:", animalData);

  // Each animal is an object with tons of information
  const petCardElements = [];

  animalData.forEach((animal) => {
    // What information do we want to extract from the animal object for our cards?
    // Let Petcard component handle it
    if (animal.primary_photo_cropped !== null) {
      petCardElements.push(<PetCard key={animal.id} animal={animal} />);
    }
  });

  return (
    <div className="results-container">
      <h1>Your ready to adopt matches!</h1>
      <div className="pet-card-container">{petCardElements}</div>
    </div>
  );
};

export default ResultsPage;
