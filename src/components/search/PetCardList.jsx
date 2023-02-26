import React from "react";
import PetCard from "./PetCard";

const PetCardList = () => {
  return (
    <div className="pet-card-container">
      <div className="card-row">
        <PetCard />
        <PetCard />
        <PetCard />
      </div>
      <div className="card-row">
        <PetCard />
        <PetCard />
        <PetCard />
      </div>
      <div className="card-row">
        <PetCard />
        <PetCard />
        <PetCard />
      </div>
    </div>
  );
};

export default PetCardList;
