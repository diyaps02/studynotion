const mongoose = require("mongoose");
const courses = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  coursedescription: {
    type: String,
  },
  whatYouWillLearn: {
    type: String,
    required: true,
  },
  duration: [{ day: Number, startTime: Date, endTime: Date }],
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseContent: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Section",
    },
  ],
  instructions: {
    type: [String],
  },
  ratingreviews: [{ type: mongoose.Types.ObjectId, ref: "Ratingreviews" }],
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  tag: {
    type: [String],
    required: true,
  },
  category: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
  studentsEnrolled: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Course", courses);
