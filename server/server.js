require("dotenv").config();
const axios = require("axios");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// ----- Middleware ----- //

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

// ----- Routes ----- //

const getToken = async () => {
  const body = {
    grant_type: "client_credentials",
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
  };

  return await axios
    .post("https://api.petfinder.com/v2/oauth2/token", body)
    .then((data) => {
      return data.data.access_token;
    });
};
let accessToken = getToken(); // Async token
setTimeout(() => {
  console.log(accessToken);
}, 1000);
// headers: { Authorization: `Bearer ${accessToken}` }

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(8080);
console.log("Listening at http://localhost:8080");
