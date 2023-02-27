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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(8080);
console.log("Listening at http://localhost:8080");
