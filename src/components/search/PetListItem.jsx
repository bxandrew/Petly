import React from "react";

const PetListItem = ({ animal, handleDelete }) => {
  const profilePic = animal.primary_photo_cropped.small;
  const name = animal.name;
  const email = animal.contact.email;
  const phone = animal.contact.phone;
  const address = animal.contact.address;
  const breed = animal.breeds.primary;
  const environment = animal.environment;

  const location = `${address.city}, ${address.state} ${address.postcode}`;
  return (
    <div>
      <div>
        <img src={profilePic} />
      </div>
      <div>
        <div>{name}</div>
        <div>Shelter ID: {animal.organization_id}</div>
        <div>{animal.description}</div>
        <div>{breed}</div>
        <div>{animal.tags}</div>
        <div>{animal.status}</div>
        <div>{location}</div>
        <button onClick={() => handleDelete(animal.id)}>Unfavorite</button>
      </div>
    </div>
  );
};

export default PetListItem;
