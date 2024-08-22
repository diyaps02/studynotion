const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token:{
    type: String
  },
  accounttype: {
    type: String,
    enum: ["admin", "student", "instructor"],
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
  additionaldetails:{
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
  image: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  newpasswordtoken:{
   type:String
  },
  approved: {
    type: Boolean,
    default: true,
  },
  courseprogress: [{ type: mongoose.Types.ObjectId, ref: "Courseprogress" }],
  
},{ timestamps: true }
);
module.exports = mongoose.model("User", userschema);
