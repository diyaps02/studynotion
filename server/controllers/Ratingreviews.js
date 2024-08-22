const mongoose =require("mongoose");
const Courses=require("../models/courses");
const User=require("../models/user");
const Ratingreviews=require("../models/ratingreviews");
const courses = require("../models/courses");

exports.createRating=async(req,res)=>{
    try {
        const {rating,review="",courseId}=req.body;
        const userId = req.user.id; 
        console.log("userId rating courseId",userId,rating,courseId);
        if(!rating||!userId||!courseId){
            return res.status(400).json({
                success:false,
                message:"all fields are required to create a review"
            })
        }
        const user= await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            })
        }
        const coursedetails=await Courses.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!coursedetails){
            return res.status(400).json({
                success:false,
                message:"student is not enrooled in the course"
            })
        }
        const alreadyrated= await Ratingreviews.findOne({user:userId,course:courseId});
        if(alreadyrated){
            return res.status(400).json({
                success:false,
                message:"cannot rate one course twice"
            })
        }
        const createrating= await Ratingreviews.create({
            user:userId,rating,review,course:courseId
        });
        const courseupdate= await Courses.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingreviews:createrating
            }
        },{new:true});
        return res.status(200).json({
            success:true,
            courseupdate:courseupdate,
            message:"review posted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while posting a review"
        })
    }
}

exports.getaveragerating=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const coursedetails=await Courses.findById(courseId);
        const result=await Ratingreviews.aggregate([
            {
              $match:{
                course: new mongoose.Types.ObjectId(courseId)
              }},{
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
              }
        
    ]);
    if(result.length>0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating
        })
    }
    return res.status(200).json({
        success:true,
        message:"average rating is zero,no ratings given till now",
        averageRating:0
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while finding avg rating",
            error:error.message
        })
    }
}

exports.getallreviews=async(req,res)=>{
    try {
        console.log("hello allreviews ");
        const allreviews= await Ratingreviews.find({})
        .populate({
            path:"user",
            select:"firstname lastname email image"
        })
        .populate({
            path:"course",
            select:"coursename"
        })
        .exec();

        return res.status(200).json({
            success:true,
            message:"all reviews fetched successfully",
            data:allreviews
        })
//.sort({${rating:1}}) is temporaryly removed
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while finding all reviews",
            error:error.message
        })
    }
}