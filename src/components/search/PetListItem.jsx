import React from "react";

const PetListItem = ({ animal, handleDelete }) => {
  const profilePic = animal.primary_photo_cropped.small;
  const name = animal.name;
  const email = animal.contact.email;
  const phone = animal.contact.phone;
  const address = animal.contact.address;
  const breed = animal.breeds.primary;
  const environment = animal.environment;
  console.log(animal.tags);

  const traits = animal.tags.map((tag) => {
    return <span key={tag}>{tag}</span>;
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
          {name}
        </div>
        <div className="list-details">
          <div>
            <div>
              <span>Shelter ID:</span> {animal.organization_id}
            </div>
            <div>
              <span>Description:</span> {animal.description}
            </div>
            <div>
              <span>Breed:</span> {breed}
            </div>
            <div className="list-traits">
              <span>Traits:</span> {traits.slice(0, 5)}
            </div>
            <div>
              <span>Email:</span> {email}
            </div>
            <div>
              <span>Phone:</span> {phone}{" "}
            </div>
            <div>
              <span>Location:</span> {location}
            </div>
          </div>
          <button onClick={() => handleDelete(animal.id)}>Unfavorite</button>
        </div>
      </div>
    </div>
  );
};

export default PetListItem;
