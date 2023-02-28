import React, { useState, useEffect } from "react";
import { Formik, Form, useField, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./searchpage.scss";
import dogBreeds from "./breed_data/dogBreeds.js";
import catBreeds from "./breed_data/catBreeds.js";
import birdBreeds from "./breed_data/birdBreeds.js";
import chinchillaBreeds from "./breed_data/chinchillaBreeds.js";

const dogBreedsList = dogBreeds.breeds.map((breed) => breed.name);
const catBreedsList = catBreeds.breeds.map((breed) => breed.name);
const birdBreedsList = birdBreeds.breeds.map((breed) => breed.name);
const chinchillaBreedsList = chinchillaBreeds.breeds.map((breed) => breed.name);

const breedOptions = (breedList) => {
  const options = breedList.map((breed) => {
    return (
      <option key={breed} value={breed}>
        {breed}
      </option>
    );
  });

  return options;
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // Returns .getFieldProps as field and .getFieldMeta as meta
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const defaultHighlight = {
  dog: false,
  cat: false,
  bird: false,
  chinchilla: false,
};

const SearchPage = ({ animalData, setAnimalData, setNextPage }) => {
  const [type, setType] = useState("");
  const [highlight, setHighlight] = useState(defaultHighlight);
  const navigate = useNavigate();

  const handleTypeClick = (value) => {
    setType(value);
    if (value === "small & furry") {
      value = "chinchilla";
    }
    setHighlight({ ...defaultHighlight, [value]: true });
  };

  // Everytime we reach the search page, reset our animalData
  useEffect(() => {
    setAnimalData([]);
  }, []);

  // Do pagination by giving the pagination link to results
  const handleSearch = (values) => {
    axios
      .get("http://localhost:8080/animals", {
        params: {
          limit: 100,
          type: type,
          location: values.location,
          breed: values.breed,
          gender: values.gender,
        },
      })
      .then(({ data }) => {
        console.log(data.animals);
        // Spreading prev data with new animal data
        setAnimalData([...animalData, ...data.animals]);
        setNextPage({ href: data.pagination._links.next.href });
        //data.pagination._links.next.href = link
        console.log(data.pagination);
      })
      .catch((err) => {
        console.log("Error retrieving animal");
      });
  };

  return (
    <div className="search-container">
      <h1>What type of friend are you looking for?</h1>
      <div className="search-form-container">
        <div className="search-form-top">
          <div
            className={`icon-container ${highlight.dog ? "highlight" : ""}`}
            onClick={() => handleTypeClick("dog")}
          >
            <img src="./dog-icon.png" />
          </div>
          <div
            className={`icon-container ${highlight.cat ? "highlight" : ""}`}
            onClick={() => handleTypeClick("cat")}
          >
            <img src="./cat-icon.png" />
          </div>
          <div
            className={`icon-container ${highlight.bird ? "highlight" : ""}`}
            onClick={() => handleTypeClick("bird")}
          >
            <img src="./bird-icon.png" />
          </div>
          <div
            className={`icon-container ${
              highlight.chinchilla ? "highlight" : ""
            }`}
            onClick={() => handleTypeClick("small & furry")}
          >
            <img src="./chinchilla-icon.png" />
          </div>
        </div>
        <div className="search-form-bottom">
          <Formik
            initialValues={{
              location: "",
              gender: "male, female",
            }}
            validationSchema={Yup.object({
              location: Yup.number()
                .min(10000, "Must be a 5 digit zipcode")
                .max(99999, "Must be a 5 digit zipcode")
                .typeError("Must be a 5 digit zipcode"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(
                "Our search values are: ",
                JSON.stringify(values, null, 2)
              );
              setSubmitting(false);
              handleSearch(values);
              navigate("/results");
            }}
          >
            <Form>
              <MyTextInput label="Location" name="location" type="text" />
              <>
                <label htmlFor="breed">Select a Gender</label>
                <Field as="select" name="gender" isClearable={true}>
                  <option value="male, female">No Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
              </>
              {type ? (
                <>
                  <label htmlFor="breed">Select a Breed</label>
                  <Field as="select" name="breed">
                    {type === "dog" ? breedOptions(dogBreedsList) : null}
                    {type === "cat" ? breedOptions(catBreedsList) : null}
                    {type === "bird" ? breedOptions(birdBreedsList) : null}
                    {type === "small & furry"
                      ? breedOptions(chinchillaBreedsList)
                      : null}
                  </Field>
                </>
              ) : null}
              <button type="submit">Search</button>
              <button
                type="reset"
                onClick={() => {
                  setHighlight(defaultHighlight);
                }}
              >
                Reset Filters
              </button>
            </Form>
          </Formik>
          {/* <div>
            First Row
            <input placeholder="Enter a Zipcode" />
            <input />
            <button>More Filters</button>
          </div> */}
          {/* <div>
            Second Row
            <input />
            <input />
            <input />
          </div> */}
          {/* <div>
            Button Row
            <Link to="/results">
              <button onClick={handleSearch}>Search</button>
            </Link>
            <button>Reset</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
