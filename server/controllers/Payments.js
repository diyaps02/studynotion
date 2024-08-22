const { instance } = require("../config/razorpay");
const Courseprogress=require("../models/courseprogress");
const Courses = require("../models/courses");
require("dotenv").config();
const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const crypto =require("crypto");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

exports.capturepayment=async(req,res)=>{
  const {courses}=req.body;
  const userId=req.user.id;
  console.log("a");
  if(courses.length==0){
   return res.status(400).json({
      success:false,
      message:"Please provide Course Id"
    })
  }
  
  else{
    let totalamount=0;
    for(const course_id of courses){
      let course;
      try {
       course=await Courses.findById(course_id);
       
       if(!course){
        return res.status(400).json({
          success:false,
          message:"could not find course"
        })
       }
console.log("b");
       const uId=new mongoose.Types.ObjectId(userId);
       if(await course.studentsEnrolled.includes(uId)){
        return res.status(400).json({
          success:false,
          message:"student is alrady enrolled"
        })
       }
       console.log("c");
       totalamount=totalamount+course.price;

      }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:error.message
        })
      }
  
    }
    const options={
      amount:totalamount*100,
      currency:"INR",
      receipt:Math.random(Date.now()).toString(),
     
    }
    try {
      const paymentresponse= await instance.orders.create(options);
      return res.status(200).json({
                success: true,
                message: paymentresponse,
              });
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,message:error});
    }
  }
}
exports.verifySignature=async(req,res)=>{
  const razorpay_order_id=req.body.razorpay_order_id;
  const razorpay_payment_id=req.body.razorpay_payment_id;
  const razorpay_signature= req.body.razorpay_signature;
  const {courses}=req.body;
  const userId=req.user.id;

  
  if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature||!courses||!userId){
    return res.status(400).json({
      success:false,message:"Payment failed"
    })
  }
  let body=razorpay_order_id+"|" +razorpay_payment_id;
  const expectedSignature=crypto
  .createHmac("sha256",process.env.RAZORPAY_SECRET)
  .update(body.toString())
  .digest("hex");
  if(expectedSignature==razorpay_signature){
    //enroll karo student ko
    await enrolledstudents(courses,userId,res);
    return res.status(200).json({success:true,message:"Payment Verified"});
  }
  return res.status(500).json({success:false,message:"Payment Failed"});

}

const enrolledstudents=async(courses,userId,res)=>{
try {
  if(!courses||!userId){
    return res.status(500).json({success:false,message:"Please Provide data for Courses or UserID"});
  }
  for(const course_id of courses){
    const enrolledCourse= await Courses.findOneAndUpdate({_id:course_id},{$push:{studentsEnrolled:userId},},{new:true});
    if(!enrolledCourse){
      return res.status(500).json({success:false,message:"Course Not Found"});
    }
    //find student and add enrolled course in user

    const courseProgress=await Courseprogress.create({
      courseId:course_id,
      userId:userId,
      completed_videos:[]
    });
    

    const enrolledStudent=await User.findByIdAndUpdate(userId,{$push:{
      courses:course_id,
      courseprogress:courseProgress._id
    }},{new:true});
    
    const emailresponse=await mailSender(
      enrolledStudent.email,
      `Successfully enrolled into ${enrolledCourse.coursename}`,
      courseEnrollmentEmail(
        `${enrolledCourse.coursename}`,
        `${enrolledStudent.firstname} ${enrolledStudent.lastname}`
      )
    )
    console.log("email sent successfully");
  }
} catch (error) {
  console.log(error);
  return res.status(500).json({sucess:false,message:error.message});

}
}
exports.sendPaymentSuccessulEmail=async(req,res)=>{
  const {orderId,paymentId,amount}=req.body;
  console.log("sgsg",orderId,paymentId,amount)
  const userId=req.user.id;
  if(!orderId||!paymentId|| !amount||!userId){
    return res.status(400).json({success:false,message:"Please provide all the fields"});
  }
  try {
    //student ko dhundo
    const enrolledStudent=await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(`${enrolledStudent.firstname} ${enrolledStudent.lastname}`,amount/100,orderId,paymentId)
    )
  } catch (error) {
    console.log("error in sending mail",error);
    return res.status(500).json({success:false,message:error.message});
  }
}
// exports.capturepayment = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const userId = req.user.id;
//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "required information is not provided",
//       });
//     }
//     const coursedetails = await Course.findById(courseId);
//     if (!coursedetails) {
//       return res.status(400).json({
//         success: false,
//         message: "could not find the course",
//       });
//     }
//     //convert user id string to object id coz db me object id stored hai
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (await Courses.studentsEnrolled.includes(uid)) {
//       return res.status(400).json({
//         success: false,
//         message: "student is already enrolled",
//       });
//     }
//     const amount = coursedetails.price;
//     const currency = "INR";
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: courseId,
//         userId: userId,
//       },
//     };
//     try {
//       const paymentresponse = await instance.orders.create(options);
//       console.log(paymentresponse);
//       return res.status(200).json({
//         sucess: true,
//         message: "student enrolled in course successfully",
//         courseName: coursedetails.courseName,
//         thumbnail: coursedetails.thumbnail,
//         orderId: paymentresponse._id,
//         currency: paymentresponse.currency,
//         amount: paymentresponse.amount,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: "something went wrong while proccesing the payment",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "something went wrong while proccesing the payment",
//     });
//   }
// };
//recipt me random number ayega to same receipts ban jayengi kuch logo ke liye
// exports.verifySignature = async (req, res) => {
//   const webHookSecret = "87654321";
//   const signature = req.headers("x-razorpay-signagure");
//   const shasum = crypto.createHmac("sha256", webHookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature == digest) {
//     console.log("payment is authorised");
//     try {
//       const { courseId, userId } = req.body.payload.payment.entity.notes;
//       const enrolledcourse = await Courses.findById(
//         { _id: courseId },
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         { new: true }
//       );
//       const userenrolled = await User.findById(
//         { _id: userId },
//         {
//           $push: {
//             courses: courseId,
//           },
//         },
//         { new: true }
//       );
//       console.log(userenrolled);
//       const emailresponse = await mailSender(
//         userenrolled.email,
//         "congratulations by studynotion",
//         "congratulations,you have been successfully enrolled"
//       );
//       return res.status(200).json({
//         success: true,
//         message: "signature verified and course added",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message:
//           "something went wrong verifying the signature and adding course",
//         error: error.message,
//       });
//     }
//   }
// };
