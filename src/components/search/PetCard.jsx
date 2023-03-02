import React, { useState, useEffect } from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { CgMoreVerticalR } from "react-icons/cg";
import { TiLocation, TiArrowBack, TiExport } from "react-icons/ti";
// import "./petcard.scss";

const PetCard = ({ animal, handleAddToList }) => {
  const [showMore, setShowMore] = useState(false);
  const [morePhotos, setMorePhotos] = useState([]);
  const [currPicIndex, setCurrPicIndex] = useState(0);

  const {
    id,
    age,
    type,
    photos,
    size,
    status,
    name,
    contact,
    description,
    gender,
  } = animal;

  const primaryBreed = animal.breeds.primary;
  const secBreed = animal.breeds.secondary;
  const profilePhoto = animal.primary_photo_cropped.small;

  useEffect(() => {
    if (photos.length > 1) {
      const onlyMediumPhotos = photos.map((photo) => photo.medium);
      setMorePhotos(onlyMediumPhotos);
    }
  }, []);

  const handleImageClick = () => {
    if (currPicIndex >= morePhotos.length - 1) {
      setCurrPicIndex(0);
    } else {
      setCurrPicIndex(currPicIndex + 1);
    }
  };

  const genderDiv = () => {
    return gender === "Male" ? (
      <div className="gender-male">{gender}</div>
    ) : (
      <div className="gender-female">{gender}</div>
    );
  };

  return (
    <div className="pet-card">
      <div className="pet-card-top">
        <div className="profile-pic">
          {morePhotos.length > 0 ? (
            <>
              <img
                src={morePhotos[currPicIndex]}
                onClick={handleImageClick}
                className="clickable-image"
              />
              <div className="photo-indicator" onClick={handleImageClick}>
                {TfiMoreAlt()}
              </div>
            </>
          ) : (
            <img src={profilePhoto} />
          )}
        </div>
        <div
          className="animal-name"
          style={name.length > 13 ? { fontSize: "1rem" } : null}
        >
          {name}
        </div>
        <div
          className="animal-breed"
          style={
            (secBreed && primaryBreed.length + secBreed.length > 20) ||
            primaryBreed.length > 20
              ? { fontSize: "0.8rem" }
              : null
          }
        >
          {primaryBreed} {secBreed ? `/ ${secBreed}` : ""}
        </div>
        <div className="animal-gender-size">
          {genderDiv()}
          <div className="animal-size">{size}</div>
          {description ? (
            <div className="show-more" onClick={() => setShowMore(!showMore)}>
              {CgMoreVerticalR()}
            </div>
          ) : null}
        </div>
        {showMore ? <div className="description">{description}</div> : null}
      </div>
      <div className="pet-card-bottom">
        <div className="contact-container">
          <div className="contact">Contact Information</div>
          {contact.email ? (
            <div className="email">
              {MdMarkEmailRead()}
              <div>{contact.email}</div>
            </div>
          ) : null}
          {contact.phone ? (
            <div>
              {BsFillTelephoneForwardFill()} {contact.phone}
            </div>
          ) : null}
          <div>
            {TiLocation()} {contact.address.city},{contact.address.state}{" "}
            {contact.address.postcode}
          </div>
        </div>
        <div className="button-container">
          <button className="details" onClick={() => handleAddToList(animal)}>
            {TiExport()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
