const mongoose=require("mongoose");
const sendMailer=require("../utils/mailSender");
const emailtemplate=require("../mail/templates/emailVerificationTemplate");
const otpschema= new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,trim:true},
    createdat:{type:Date,default:Date.now(),expires:5*60}
});

async function sendVerificationEmail(email,otp){
    try {
        const mailResponse= await sendMailer(email,"Verification Email from Studynotion",emailtemplate(otp));
        console.log("Email sent Successfully",mailResponse);
    } catch (error) {
        console.log("error occured while sending the mail:",error);
        throw error;
    }
}
otpschema.pre("save",async function (next){
  await sendVerificationEmail(this.email,this.otp);
  next();
})
module.exports= mongoose.model("OTP",otpschema);