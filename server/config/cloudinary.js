const cloudinary=require("cloudinary").v2;
require("dotenv").config();
const cloudinaryconnect=()=>{
  try {
    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_NAME, 
      api_key: process.env.CLOUDINARY_APIKEY, 
      api_secret: process.env.CLOUDINARY_SECRET
    });
    console.log("connected to cloudinary");
  } catch (error) {
    consolr.log("error while connecting to cloudinary");
  }
}
module.exports= cloudinaryconnect;