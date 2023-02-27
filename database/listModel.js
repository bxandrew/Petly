const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  animalList: {
    type: Array,
    default: [],
  },
});

const List = mongoose.model("lists", ListSchema);
module.exports = List;
