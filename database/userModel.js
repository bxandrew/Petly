const mongoose = require("mongoose");
const { Schema } = mongoose;
// const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
