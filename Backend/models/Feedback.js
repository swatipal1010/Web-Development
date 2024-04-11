const mongoose = require("mongoose");
const feedback = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
  Review: {
    type: String,
    required: true,
  },
  Rating : {
    type : String,
    min: 1,
    max: 5,
    required: true,
  }
});

const Feedback = mongoose.model("Feedback", feedback);
module.exports = Feedback;