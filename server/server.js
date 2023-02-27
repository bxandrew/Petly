require("dotenv").config();
const axios = require("axios");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("./passport/setup");
const auth = require("./routes/auth");

const List = require("../database/listModel");

const db = require("../database/db");
db.connect();

// ----- Middleware ----- //

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

//----- Express Session -----//
app.use(
  session({
    secret: "Very secret",
    resave: false,
    saveUninitialized: true,
  })
);

//---- Passport Middleware //
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);

//----- Token -----//
let token;
const getToken = async () => {
  const body = {
    grant_type: "client_credentials",
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
  };

  // Result will be the access_token in string form
  let result = await axios
    .post("https://api.petfinder.com/v2/oauth2/token", body)
    .then(({ data }) => {
      return data.access_token;
    });

  token = result;
  // console.log(token);
};
getToken(); // Async token
// ==================================================

// ----- Start of routes ----- //
app.get("/animals", async (req, res) => {
  const { query } = req;
  console.log(query);

  await axios
    .get("http://api.petfinder.com/v2/animals", {
      params: query,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Error retrieving animals" });
    });
});

app.get("/animals/more", async (req, res) => {
  const { href } = req.query;
  console.log(req.query);

  await axios
    .get(`http://api.petfinder.com${href}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Error retrieving more animals" });
    });
});

// Get the animals for My List Page
app.get("/animals/mylist", async (req, res) => {
  // Find the animals by using our userId to find our list stored in mongodb
  console.log("I am in the myList route");
  res.send("Hello");
});

//------ Last route to render our react page no matter what ----- //
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

// Route to add animals to our list
app.post("/animals", async (req, res) => {
  // If we cant find an existing entry in our db, create one
  const { userId, animal } = req.body.data;
  console.log(userId);

  // Push our animal into our database if we have an already existing instance list
  let result = await List.findOneAndUpdate(
    { userId: userId },
    { $push: { animalList: animal } }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  // If we do not already have an entry for our userId, make a new one
  if (result === null) {
    const newList = new List({ userId: userId, animalList: [animal] });
    newList.save().then(() => {
      console.log("created new db entry");
    });
  }

  res.status(200).send("Success");
});

app.listen(8080);
console.log("Listening at http://localhost:8080");
