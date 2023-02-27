import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./searchpage.scss";

const SearchPage = ({ animalData, setAnimalData }) => {
  const [page, setPage] = useState(0);
  // Everytime page is reset to 0, (on every new search), reset our animalData
  useEffect(() => {
    setAnimalData([]);
  }, []);

  //Lift this state up so that we can do pagination of pets
  const handleSearch = () => {
    console.log("inside handle", page);
    axios
      .get("http://localhost:8080/animals", {
        params: {
          page: page + 1,
          limit: 50,
        },
      })
      .then(({ data }) => {
        console.log(data.animals);
        setAnimalData([...animalData, ...data.animals]);
        setPage(data.pagination.current_page);
      });
  };

  return (
    <div className="search-container">
      <h1>What type of friend are you looking for?</h1>
      <div className="search-form-container">
        <div className="search-form-top">
          <div>Circle picture</div>
          <div>Circle picture</div>
          <div>Circle picture</div>
          <div>Circle picture</div>
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
