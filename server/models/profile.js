const mongoose=require("mongoose");
const profileschema = new mongoose.Schema({
 gender:{
    type:String,
    trim:true
},
 dob:{
    type:String,
},
 about:{
    type:String,
    trim:true
},
 phone_no:{
    type:Number,
    trim:true
},
});
module.exports=mongoose.model("Profile",profileschema);
