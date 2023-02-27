import React, { useState } from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import { TiLocation, TiArrowBack, TiExport } from "react-icons/ti";
import "./petcard.scss";

const PetCard = ({ animal, handleAddToList }) => {
  const [showMore, setShowMore] = useState(false);
  const { id, age, type, photos, size, status, name, contact, description } =
    animal;

  const profilePhoto = animal.primary_photo_cropped.small;

  return (
    <div className="pet-card">
      <div className="pet-card-top">
        <div className="profile-pic">
          <img src={profilePhoto} />
        </div>
        <div className="animal-name">{name}</div>
        <div>
          <button onClick={() => setShowMore(!showMore)}>Learn More</button>
          <button onClick={() => handleAddToList(animal)}>Add to List</button>
        </div>
        {showMore ? <div className="description">{description}</div> : null}
      </div>
      <div className="pet-card-bottom">
        <div className="contact-container">
          <div className="contact">Contact Information</div>
          <div className="email">
            {MdMarkEmailRead()} {contact.email}
          </div>
          <div>
            {BsFillTelephoneForwardFill()} {contact.phone}
          </div>
          <div>
            {TiLocation()} {contact.address.city},{contact.address.state}{" "}
            {contact.address.postcode}
          </div>
        </div>
        <div className="button-container">
          <button className="details">{TiExport()}</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
