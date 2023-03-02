import React from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import { TiLocation } from "react-icons/ti";

const PetListItem = ({ animal, handleDelete }) => {
  const profilePic = animal.primary_photo_cropped.small;
  const name = animal.name;
  const email = animal.contact.email;
  const phone = animal.contact.phone;
  const address = animal.contact.address;
  const breed = animal.breeds.primary;
  const environment = animal.environment;

  const traits = animal.tags.map((tag) => {
    return <div key={tag}>{tag}</div>;
  });

  const location = `${address.city}, ${address.state} ${address.postcode}`;
  return (
    <div className="my-list-animal-item">
      <div>
        <img src={profilePic} className="my-list-profile-pic" />
      </div>
      <div className="my-list-right-container">
        <div
          className="list-name"
          style={name.length > 15 ? { fontSize: "1.2rem" } : null}
        >
          {name.length > 30 ? name.slice(0, 30) : name}
        </div>
        <div className="list-details">
          <div className="top-detail-container">
            <div className="top-traits">
              <div>
                <span>Shelter ID:</span> {animal.organization_id}
              </div>
              <div style={animal.description && animal.description.length > 115 ? { fontSize: "0.85rem" } : null}>
                <span>Description:</span> {animal.description}
              </div>
              <div>
                <span>Breed:</span> {breed}
              </div>
              {traits.length ? <div className="list-traits">
                <span>Traits:</span> {traits.slice(0, 3)}
              </div> : null}
            </div>
            <div className="contact-container">
              <div className="contact-details">
                {MdMarkEmailRead()} {email}
              </div>
              <div className="contact-details">
                {BsFillTelephoneForwardFill()} {phone}
              </div>
              <div className="contact-details">
                {TiLocation()} {location}
              </div>
            </div>
          </div>
          <button onClick={() => handleDelete(animal.id)}>Unfavorite</button>
        </div>
      </div>
    </div>
  );
};

export default PetListItem;



