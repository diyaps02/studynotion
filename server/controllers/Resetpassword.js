const User=require("../models/user");
const sendMailer=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

//reset passwordtoken
exports.resetpasswordtoken=async(req,res)=>{
try {
    const {email}=req.body;
    if(!email){
        return res.status(400).json({
            success:false,
            message:"please enter your email"
        })
    }
    const user=User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,  
            message:"no user exist with this email"
        })
    }
    const token=  crypto.randomBytes(20).toString("hex");
    //console.log("token>",token);
    
    const url= `http://localhost:3000/update-password/${token}`;

    const updatedetails= await User.findOneAndUpdate({email:email},{newpasswordtoken:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true});

    await sendMailer(email,"password reset link from studynotion",`password reset link ${url}`);

    res.status(200).json({
        success:true,
        updateddetails:updatedetails,
        message:"password reset link sent"  
    })

} catch (error) {
    return res.status(500).json({
            success:false,
            message:"error sending email or link"
        })
}
}
//reset password
exports.resetpassword=async(req,res)=>{
try {
    const {password,confirmnewpassword,token}=req.body;
    
    if(!password||!confirmnewpassword){
        return res.status(400).json({
            success:false,
            message:"fill password correctly"
        });
    }
    if(!password==confirmnewpassword){
        return res.status(400).json({
            success:false,
            message:"password does not match"
        });   
    }
    if(!token){
        return res.status(400).json({
            success:false,
            message:"token is not provided"
        });   
    }
    const userDetails= User.findOne({newpasswordtoken:token});
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"token is invalid"
        });   
    }
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.status(400).json({
            success:false,
            message:"token is expired , regenerate your link"
        });    
    }
    let hashpassword= await bcrypt.hash(password,10);
    await User.findOneAndUpdate({newpasswordtoken:token},{
        password:hashpassword
    },{new:true});
    console.log("finally u reached");
    res.status(200).json({
        success:true,
        message:"password is reseted successfully"
    })

} catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
        
    });  
}
}