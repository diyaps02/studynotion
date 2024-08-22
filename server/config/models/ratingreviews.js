const mongoose = require("mongoose");
const ratingreviews = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  rating: {
    type: Number,
    required:true
  },
  review: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("Ratingreviews", ratingreviews);
