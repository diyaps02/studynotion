const mongoose = require("mongoose");

const chatroom = new mongoose.Schema({

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  members: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }],
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  name:{
    type:String,
    require:true,
    unique:true,
  }

});

module.exports=new mongoose.model("Chatroom",chatroom);
