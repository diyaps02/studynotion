const mongoose = require("mongoose");
const categoryschema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, trim: true },
  courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
});
module.exports = mongoose.model("Category", categoryschema);
