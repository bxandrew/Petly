import React from "react";
import "./petcard.scss";

const PetCard = () => {
  return (
    <div className="pet-card">
      <div className="pet-card-top">
        <div className="profile-pic">Picture of Animal</div>
        <div className="animal-name">Doggo</div>
        <div>
          <button>Learn More</button>
        </div>
      </div>
      <div className="pet-card-bottom">
        <div>
          <div>Contact Information:</div>
          <div>email</div>
          <div>phone</div>
        </div>
        <button>></button>
      </div>
    </div>
  );
};

export default PetCard;
