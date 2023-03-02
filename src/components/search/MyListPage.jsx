import React, { useState, useEffect } from "react";
import axios from "axios";
import PetListItem from "./PetListItem";
import "./mylistpage.scss";
import testdata from "../testdata.js";

// For testing and development purposes, remove this and testdata after deploying
const photosOnly = testdata.animals.filter((animal) => {
  return animal.primary_photo_cropped;
});

const MyListPage = ({ session }) => {
  // const [myAnimals, setMyAnimals] = useState([]);
  const [myAnimals, setMyAnimals] = useState(photosOnly);
  console.log(myAnimals);

  useEffect(() => {
    axios
      .get("http://localhost:8080/animals/mylist", {
        params: {
          userId: session,
        },
      })
      .then(({ data }) => {
        setMyAnimals(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    const updatedList = myAnimals.filter((animal) => {
      return animal.id !== id;
    });
    axios
      .put("http://localhost:8080/animals/mylist", {
        data: {
          userId: session,
          animalList: updatedList,
        },
      })
      .then(({ data }) => {
        setMyAnimals(data.data);
      });
  };

  const petList = myAnimals.map((animal) => {
    return (
      <PetListItem
        key={animal.id}
        animal={animal}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <div className="my-list-container">
      <h1>Your Favorite Picks</h1>
      {petList}
    </div>
  );
};

export default MyListPage;
