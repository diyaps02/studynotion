const Messages= require( "../models/messages");

exports.createMessage= async(req,res)=>{
try {
    const {chatId,message}=req.body;
    const {id}=req.user;

    if(!chatId||!message){
        res.status(402).json({
            success:false,
            message:"please provide all required fields"
        })
    }


    const sendmessage= await Messages.create({
        textmesage:message,
        sender:id,
        chatgroup:chatId
    })

    res.status(200).json({
        success:true,
        message:"message created successfully",
        data:sendmessage
    })

} catch (error){
    res.status(500).json({
        success:false,
        message:"could not create message",
        error:error.message
    })
}
}

exports.getMessages=async(req,res)=>{
    try {
        const {chatId}=req.body;
        if(!chatId){
            res.status(400).json({
                success:false,
                message:"chatRoomId is required"
            })
        }
        
        const allmessages= await Messages.find({chatgroup:`${chatId}`}).populate("sender").exec();
        if(!allmessages){
            res.status(402).json({
                success:false,
                message:"there are no messages in this chatroom"
            })
        }
        res.status(200).json({
            success:true,
            message:"messages fetched successfully",
            data:allmessages
        })


    } catch (error) {
        res.status(500).json({
            succss:false,
            error:error.message
        })
    }
}

exports.delteMessage=async(req,res)=>{
    try {
        const {messageId,}=req.body;
        if(!messageId){
            res.status(400).json({
                success:false,
                message:"messageId is required"
            })
        }
        
        const deletedmessage= await Messages.findByIdAndDelete(messageId);
        const updatedmessage=await Messages.find({chartgroup:deletedmessage.chatgroup}).populate("sender").exec();

        res.status(200).json({
            success:true,
            message:"messages deleted successfully",
            data:updatedmessage
        })

    } catch (error) {
        res.status(500).json({
            succss:false,
            error:error.message
        })
    }
}

