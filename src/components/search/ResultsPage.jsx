import React from "react";
import axios from "axios";
import PetCard from "./PetCard";
import "./resultspage.scss";

const ResultsPage = ({
  animalData,
  setAnimalData,
  nextPage,
  setNextPage,
  session,
}) => {
  console.log("ResultsPage, data:", animalData);

  const handleMoreClick = () => {
    console.log("More clicked");
    if (nextPage.href === undefined) {
      axios
        .get("http://localhost:8080/animals", {
          params: {
            limit: 100,
          },
        })
        .then(({ data }) => {
          setAnimalData([...animalData, ...data.animals]);
          setNextPage({ href: data.pagination._links.next.href });
        });
    } else {
      axios
        .get("http://localhost:8080/animals/more", {
          params: {
            href: nextPage.href,
          },
        })
        .then(({ data }) => {
          console.log("i am still here");
          setAnimalData([...animalData, ...data.animals]);
          setNextPage({ href: data.pagination._links.next.href });
        })
        .catch((err) => {
          console.log("Error retrieving animal");
        });
    }
  };

  const handleAddToList = (animalObject) => {
    axios
      .post("http://localhost:8080/animals", {
        data: {
          userId: session,
          animal: animalObject,
        },
      })
      .then(() => {
        console.log("Added to database");
      })
      .catch((err) => {
        console.log("Error adding to database");
      });
  };

  // Each animal is an object with tons of information
  const petCardElements = [];

  animalData.forEach((animal) => {
    // Only show elements where the data has a picture
    if (animal.primary_photo_cropped !== null) {
      petCardElements.push(
        <PetCard
          key={animal.id}
          animal={animal}
          handleAddToList={handleAddToList}
        />
      );
    }
  });

  return (
    <div className="results-container">
      <h1>Your ready to adopt matches!</h1>
      <h2>Login to save some of your matches to a list</h2>
      <div className="pet-card-container">{petCardElements}</div>
      <button onClick={handleMoreClick}>Load More Animals</button>
    </div>
  );
};

export default ResultsPage;
