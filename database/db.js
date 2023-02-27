const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connect = async () => {
  mongoose.connect("mongodb://localhost/petfinder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", () => {
    console.log("Connection error to mongoDB");
  });

  db.once("open", () => {
    console.log("Connected to MongoDB successfully");
  });
};

module.exports = { connect };
