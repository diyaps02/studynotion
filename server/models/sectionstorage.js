const mongoose=require("mongoose");
const sectionschema = new mongoose.Schema({
sectionname: { 
    type: String,
     required: true
 },
subsection:[
    {
        type:mongoose.Types.ObjectId,
        ref:"Subsection"
    }
]
});
module.exports=mongoose.model("Section",sectionschema);
