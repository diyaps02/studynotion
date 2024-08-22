const Section=require("../models/sectionstorage");
const Courses= require("../models/courses");
 
exports.createsection= async(req,res)=>{
  try {
    const {sectionname,courseId}=req.body;
    if(!sectionname||!courseId){
        return res.status(400).json({
            success:false,
            message:"all fields are required to create a section"
        });   
    }
    const newsection = await Section.create({sectionname:sectionname});
    const updatecourse= await Courses.findByIdAndUpdate({_id:courseId},{
       $push:{
        courseContent: newsection._id
       }
    },{new:true})
    .populate({
        path:"courseContent",
        populates:{
            path:"subsection"
        }
    })
    .exec();
    return res.status(200).json({
        success:true,
        message:"section created successfully",
        data:updatecourse
    })
  } catch (error) {
     res.status(500).json({
        success:false,
        message:"could not create section",
        error:error.message
    });  
  }
}
exports.updatesection=async(req,res)=>{
try {
    const {sectionId,sectionname,courseId}=req.body;
    if(!sectionId){
        return res.status(400).json({
            success:false,
            message:"section id is required to update"
        });  
    }
    const updatesection=await Section.findByIdAndUpdate({_id:sectionId},{
        sectionname:sectionname
    },{new:true});
    

    const updatedcourse=await Courses.findById(courseId).populate({
        path:"courseContent",
        populate:{
            path:"subsection",
        }
    }).exec();

    return res.status(200).json({
        success:true,
        message:"section updated successfully",
        data:updatedcourse
    });
    
} catch (error) {
    res.status(500).json({
        success:false,
        message:"could not update section",
        error:error.message
    }); 
}

}

exports.deletesection=async(req,res)=>{
    try {
       //const sectionId= req.params;
       const {sectionId}=req.body;
       const courseId=req.body.courseId;
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            });  
        }
        await Section.findByIdAndDelete(sectionId);
      const update=  await Courses.findByIdAndUpdate({_id:courseId},{$pull:{section:{$eq:sectionId}}},{new:true});
        return res.status(200).json({
            success:true,
            message:"section deleted successfully",
            data:update,
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"could not delete section",
            error:error.message,
        }); 
    }
}