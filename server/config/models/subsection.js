const mongoose=require("mongoose");
const subsection = new mongoose.Schema({
title:{type:String},
timeduration:{type:String},
description:{type:String},
videourl:{type:String}
});
module.exports=mongoose.model("Subsection",subsection);
