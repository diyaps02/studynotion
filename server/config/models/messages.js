const mongoose = require ("mongoose");

const message=new mongoose.Schema({

textmesage:{
    type:String,
    require:true
},
sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,
    
},
chatgroup:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chatroom",
    require:true
},
createdAt:{
    type:Date,
    default:Date.now(),
    require:true
},


});

module.exports=new mongoose.model("Message",message);