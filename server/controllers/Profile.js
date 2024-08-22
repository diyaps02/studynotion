const User=require("../models/user");
const Course=require("../models/courses");
const Courseprogress=require("../models/courseprogress");
const Profile= require("../models/profile");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const {convertSecondsToDuration} =require("../utils/secToDuration");
exports.createprofile=async(req,res)=>{
    try {
        const {about="",dob="",gender,phoneno}=req.body;
        const userId= req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"please provide user id"
            });
        }
        const user=await User.findById(userId);
        // if(!user){
        //     return res.status(400).json({
        //         success:false,
        //         message:"user does not exist"
        //     });
        // }//is it really needed dcoz user mayalready be verified if profile page is loading
        const profileId=user.additionaldetails;
        const updateprofile=await Profile.findByIdAndUpdate({_id:profileId},{
            about:about,dob:dob,gender:gender,phone_no:phoneno
        },{new:true});
       return res.status(200).json({
        success:true,
        message:"profile updated successfully",
        updateprofile
    });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while updating profile",
            error:error.message
        });   
    }

}
exports.getalluserdetails= async(req,res)=>{
    try {
        const alluserdetails= await User.find({}).populate("additionaldetails");
        return res.status(200).json({
            success: true,
            count: alluserdetails.length,
            data:alluserdetails,
            message:"all user details fetched successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"could not find users details"
        })
    }
}
exports.deleteaccount=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user= await User.findById(userId);
        console.log("a");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            });
        }
        console.log("b");
        const profileId=user.additionaldetails;
         await Profile.findByIdAndDelete(profileId);
         if(user.accounttype=="student"){
            for(const courseId of user.courses){
                await Course.findByIdAndUpdate(courseId,{$pull:{studentsEnrolled:userId}},{new:true})

            }

            console.log("c");
            await Courseprogress.deleteMany({userId:userId});

         }
         console.log("d");
         await User.findByIdAndDelete(userId);
        // hw to unenroll user from enrolled courses
        return res.status(200).json({
            success:true,
            message:"account deleted successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while deleting account",
            error:error.message
        });   
    }
}
exports.updateDisplayPicture=async(req,res)=>{
   try {
    console.log("0");
        const userId=req.user.id;
        console.log("a");
        const image=req.files.displayimage;
        if(!image){
            return  res.status(400).json({
                success:false,
                message:'No Image Provided'
                })
        }
        console.log("b");
        const uploadimage=  await uploadImageToCloudinary(image,process.env.CLOUDINARY_FOLDER_NAME);
        const updateuserdisplay= await User.findByIdAndUpdate(userId,{image:uploadimage.secure_url},{new:true});
        console.log("c");
        return res.status(200).json({
            success:true,
            data:updateuserdisplay,
            message:"user display updated successfully"
        })

   } catch (error) {
    res.status(500).json({
        success:false,
        message:'could not update user display',
        error:error.message
        })
   }
}
exports.getEnrolledCourses=async(req,res)=>{
  try {
    const userId=req.user.id;
    let userDetails=  await User.findById(userId).populate({
        path:"courses",
        populate:{
            path:"courseContent",
            populate:{
            path:"subsection"
            },
        },
    }).exec();
    userDetails = userDetails.toObject()
    if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      for (let i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          let SubsectionLength = 0
        for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subsection.reduce((acc, curr) => acc + parseInt(curr.timeduration), 0)
          userDetails.courses[i].duration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subsection.length
        }
        //understand this code thoroughly
        let courseProgressCount = await Courseprogress.findOne({
          courseId: userDetails.courses[i]._id,
          userId: userId
        });
        courseProgressCount = courseProgressCount?.completed_videos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
    }
    return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.instructorDashboard=async(req,res)=>{
    try {
        const courseDetails=await Course.find({instructor:req.user.id});
        const courseData=courseDetails.map((course)=>{
            const totalStudentsEnrolled=course.studentsEnrolled.length
            const totalAmountGenerated=totalStudentsEnrolled*course.price

            //create an new object with the additional fields
            const courseDataWithStats={
                _id:course._id,
                coursname:course.coursename,
                courseDescription:course.description,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })

        res.status(200).json({success:true,data:courseData});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        })
    }
}
exports.updateprofile=async(req,res)=>{
    try {

        const {firstname="",lastname="",about="",dob="",gender="",contactno=""}=req.body;
        const userId= req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"please provide user id"
            });
        }
        const user=await User.findById(userId);
        console.log("ab");
         if(firstname||lastname){
            if(firstname){
                user.firstname=firstname;
            }
            if(lastname){
                user.lastname=lastname;
            }
            await user.save();
         }
         console.log("bc");
        const profile=await Profile.findById(user.additionaldetails);
     
            profile.about=about;
            profile.dob=dob;
            profile.gender=gender;
            profile.phone_no=contactno;
           await profile.save();
      
      console.log("cd");
      



      const updatedUser=  await User.findByIdAndUpdate(user._id)
      .populate("additionaldetails")
      .exec();

       

       return res.status(200).json({
        success:true,
        message:"profile updated successfully",
        data:updatedUser
    });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while updating profile",
            error:error.message
        });   
    }

}