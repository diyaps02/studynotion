const Subsection= require("../models/subsection");
const Section= require("../models/sectionstorage");
const {uploadImageToCloudinary}= require("../utils/imageUploader");

exports.createsubsection= async(req,res)=>{
   try {
    const {title,description,sectionId}=req.body;
    console.log(req);
    if(!title||!description||!sectionId){
        return res.status(400).json({
            success:false,
            message:"all fields are required to create a video"
        });
    }
    console.log("a");
    const videourl= req.files.videourl;
    if(!videourl){
        return res.status(400).json({
            success:false,
            message:"video is not provided"
        });
    }
    const videodetails =  await uploadImageToCloudinary(videourl,process.env.CLOUDINARY_FOLDER_NAME);
    console.log("b");
    const newsubsection= await Subsection.create({
        title:title,
        description:description,
        timeduration: `${videodetails.duration}`,
        videourl:videodetails.secure_url
    });
    console.log("c");
    const updatedsection= await Section.findByIdAndUpdate({_id:sectionId},{
        $push:{
         subsection:newsubsection
        }
    },{new:true})
    .populate(
        "subsection",
    );
    //hw: log updated section here ,after adding populate query 
    return res.status(200).json({
        success:true,
        message:"subsection created successfully",
        data:updatedsection

    });

   }catch (error) {
    res.status(500).json({
        success:false,
        message:"something went wrong creating a video"
    });
   }
}
exports.updatesubsection=async(req,res)=>{
    try {
        const {sectionId,subsectionId,title,description}=req.body;
        // const videourl=req.files.videourl;
        // console.log(subsectionId,title,descriptionj)
        if(!subsectionId){
            return res.status(400).json({
                success:false,
                message:"subsection id is required to update"
            });  
        }
        const oldSubSection = await Subsection.findById(subsectionId)

        if(title){
            oldSubSection.title = title;
        }

        if(description){
            oldSubSection.description = description;
        }

        if(req.files){
            const videourl = req.files.videourl;
            const uploadDetails = await uploadImageToCloudinary(videourl,process.env.FOLDER_NAME)
            oldSubSection.videourl = uploadDetails.secure_url;
            oldSubSection.time = uploadDetails.duration
        }
        
        const updatedSubSection = await  oldSubSection.save();
        const  updatedSection = await Section.findById(sectionId).populate("subsection").exec()
    
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"subsection updated successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"could not update subsection",
            error:error.message
        }); 
    }
    
    }

exports.deletesubsection=async(req,res)=>{
    try {
        const {subsectionId,sectionId}=req.body;
        console.log("1")
        console.log(subsectionId,sectionId)
        if(!sectionId||!subsectionId){
            return res.status(400).json({
                success:false,
                message:"all fields not provided to delete a video"
            });
        }
     await Subsection.findByIdAndDelete(subsectionId);
   const updatedsection=  await Section.findByIdAndUpdate(sectionId,{$pull:{subsection:subsectionId}},{new:true});
        
   return res.status(200).json({
        success:true,
        message:"subsection deleted successfully",
        data:updatedsection,
     })
    } catch (error) {
         res.status(500).json({
        success:false,
        message:"something went wrong while deleting the subsection"
    });
    }
}