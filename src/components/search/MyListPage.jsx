import React, { useState, useEffect } from "react";
import axios from "axios";
import PetListItem from "./PetListItem";
import "./mylistpage.scss";

const MyListPage = ({ session }) => {
  const [myAnimals, setMyAnimals] = useState([]);
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
    <div>
      <h1>My List of Favorite Matches</h1>
      <div>Match One</div>
      {petList}
    </div>
  );
};

export default MyListPage;
