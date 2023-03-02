import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import "./petcard.scss";

const ResultsPage = ({
  animalData,
  setAnimalData,
  nextPage,
  setNextPage,
  session,
}) => {
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [showIndex, setShowIndex] = useState(20); // Show the first 20
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  console.log(showIndex);
  // console.log("ResultsPage, data:", animalData);
  useEffect(() => {
    const filteredAnimals = animalData.filter((animal) => {
      return animal.primary_photo_cropped !== null;
    });
    setCurrentAnimals([...filteredAnimals]);
    console.log("Filtered animals", filteredAnimals);
  }, [animalData]);
  console.log("Current animals", currentAnimals);

  // Loads more animals on click of more animals button
  const handleMoreClick = () => {
    setLoading(true);
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
          setLoading(false);
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
          setLoading(false);
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

  // Infinite scroll implementation
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - (scrollTop + clientHeight) < 100) {
      setShowIndex(showIndex + 10);
      if (loading === false) {
        // Prevents multiple calls to server and will reset when server responds with data
        // console.log("Current length of animals:", currentAnimals.length);
        if (currentAnimals.length - showIndex < 100) {
          handleMoreClick();
        }
      }
    }
  };

  const petCardElements = [];

  currentAnimals.slice(0, showIndex).forEach((animal) => {
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
      <div
        className="pet-card-container"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {petCardElements}
      </div>
      {/* <button onClick={handleMoreClick}>Load More Animals</button> */}
    </div>
  );
};

export default ResultsPage;
