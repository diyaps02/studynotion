const mongoose = require("mongoose");
const courseprogress = new mongoose.Schema({
courseId:{type:mongoose.Types.ObjectId,ref:"Course"},
userId:{type:mongoose.Types.ObjectId,ref:"User"},
completed_videos:[{type:mongoose.Types.ObjectId,ref:"Subsection"}]
});
module.exports=mongoose.model("Courseprogress",courseprogress);
