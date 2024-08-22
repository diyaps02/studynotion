const Chatroom=require("../models/chatroom");


exports.getChatroomDetails= async(req,res)=>{

    try {
        console.log("welcome to chatroom");
        const {chatname}= req.body;
        if(!chatname){
            res.status(402).json({
            success:false,
            message:"chatromm name is required"
            });
        }
        console.log("bcd");
        const chatroomDetails= await Chatroom.findOne({name:chatname});
        if(!chatroomDetails){
            res.status(402).json({
                success:false,
                message:"could not find doubt room"
            })
        }
        console.log("cde");
        res.status(200).json({
            success:true,
            data:chatroomDetails
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error while fetching doubtroom details",
            error:error.message
        })
    }

}