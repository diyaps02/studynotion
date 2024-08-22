const User=require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth= async(req,res,next)=>{
    try {
        console.log("req body",req.body);
        const token= req.cookies.token||req.header("Authorization").replace("Bearer ","")||req.body.token;
        const decode= jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(400).json({
                success:false,
                message:"token not provided"
            });
        }
        req.user=decode;   
              next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while validating the token"
            
        })
    }
}
exports.isStudent=async(req,res,next)=>{
try {
    if(req.user.role!="student"){
        res.status(400).json({
            success:false,
            message:"this route is protected for students only"
        })
    }
    else{
        next();
    }

} catch (error) {
    res.status(500).json({
        success:false,
        message:"User's role could not be verified"
    })
}
}

exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.role!="instructor"){
            res.status(400).json({
                success:false,
                message:"this route is protected for Instructors only"
            })
        }
        else{
            next();
        }
    
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"User's role could not be verified"
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
        try {
            if(req.user.role!="admin"){
                res.status(400).json({
                    success:false,
                    message:"this route is protected for Admin only"
                })
            }
            else{
                next();
            }
        
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"User's role could not be verified"
            })
        }
}
    