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

// app.use("/auth", auth);

// ----- Routes ----- //
let accessToken = [];
const getToken = async (accessToken) => {
  const body = {
    grant_type: "client_credentials",
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
  };

  let result = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    body
  );

  // console.log(result.data.access_token);
  const token = result.data.access_token;
  accessToken.push(token);
  return token;
};
getToken(accessToken); // Async token
// setTimeout(() => {
//   console.log(accessToken);
// }, 1000);
// axios.defaults.headers.common["Authorization"] = accessToken;
// headers: {
//   Authorization: `Bearer ${accessToken}`;
// }

app.get("/animals", async (req, res) => {
  await axios
    .get("http://api.petfinder.com/v2/animals", {
      headers: {
        Authorization: `Bearer ${accessToken[0]}`,
      },
    })
    .then((data) => {
      // console.log(data.data);
      res.status(200).send(data.data);
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

// app.get("/animals", async (req, res) => {
//   await axios.get("https://api.petfinder.com/v2/animals").then((data) => {
//     console.log(data);
//     return res.status(200).json(data);
//   });

//   // return res.status(404).json({ message: "Error retrieving animals" });
// });

app.listen(8080);
console.log("Listening at http://localhost:8080");
