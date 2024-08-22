const Courseprogress = require("../models/courseprogress");
const Subsection=require("../models/subsection");

exports.updateCourseProgress=async(req,res)=>{

const {courseId,subsectionId}=req.body;
const userId=req.user.id;
try {
    const subsection= await Subsection.findById(subsectionId);
    if(!subsection){
        return res.status(400).json({success:false,error:"Invalid subsection"});
    }
    let courseProgress=await Courseprogress.findOne({
        courseId:courseId,
        userId:userId
    });
    if(!courseProgress){
        return res.status(404).json({success:false,messsage:"courseProgress does not exist"});
    }
    else{
        if(courseProgress.completed_videos.includes(subsectionId)){
        return res.status(404).json({success:false,messsage:"courseProgress does not exist"});
        }
        courseProgress.completed_videos.push(subsectionId);

    }
await courseProgress.save();
return res.status(200).json({
    success:true,
    message:"Lecture marked as completed"
})
} catch (error) {
    return res.status(404).json({success:false,message:error});
}
}