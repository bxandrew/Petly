import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./searchpage.scss";

const SearchPage = ({ setAnimalData }) => {
  const handleSearch = () => {
    axios.get("http://localhost:8080/animals").then(({ data }) => {
      console.log(data.animals);
      setAnimalData(data.animals);
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
