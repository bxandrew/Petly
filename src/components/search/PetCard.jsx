import React from "react";
import "./petcard.scss";

const PetCard = ({ animal }) => {
  const { id, age, type, photos, size, status, name, contact } = animal;

  const profilePhoto = animal.primary_photo_cropped.small;

  return (
    <div className="pet-card">
      <div className="pet-card-top">
        <div className="profile-pic">
          <img src={profilePhoto} />
        </div>
        <div className="animal-name">{name}</div>
        <div>
          <button>Learn More</button>
        </div>
      </div>
      <div className="pet-card-bottom">
        <div>
          <div>Contact Information:</div>
          <div>email: {contact.email}</div>
          <div>phone: {contact.phone}</div>
        </div>
        <button>></button>
      </div>
    </div>
  );
};

export default PetCard;
