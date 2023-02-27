import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./searchpage.scss";

const SearchPage = ({ animalData, setAnimalData, setNextPage }) => {
  // Everytime we reach the search page, reset our animalData
  useEffect(() => {
    setAnimalData([]);
  }, []);

  // Do pagination by giving the pagination link to results
  const handleSearch = () => {
    axios
      .get("http://localhost:8080/animals", {
        params: {
          limit: 100,
        },
      })
      .then(({ data }) => {
        console.log(data.animals);
        // Spreading prev data with new animal data
        setAnimalData([...animalData, ...data.animals]);
        setNextPage({ href: data.pagination._links.next.href });
        //data.pagination._links.next.href = link
        console.log(data.pagination);
      });
  };

  return (
    <div className="search-container">
      <h1>What type of friend are you looking for?</h1>
      <div className="search-form-container">
        <div className="search-form-top">
          <div className="icon-container">
            <img src="./dog-icon.png" />
          </div>
          <div className="icon-container">
            <img src="./cat-icon.png" />
          </div>
          <div className="icon-container">
            <img src="./bird-icon.png" />
          </div>
          <div className="icon-container">
            <img src="./chinchilla-icon.png" />
          </div>
        </div>
        <div className="search-form-bottom">
          <div>
            First Row
            <input />
            <input />
            <button>More Filters</button>
          </div>
          <div>
            Second Row
            <input />
            <input />
            <input />
          </div>
          <div>
            Button Row
            <Link to="/results">
              <button onClick={handleSearch}>Search</button>
            </Link>
            <button>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
