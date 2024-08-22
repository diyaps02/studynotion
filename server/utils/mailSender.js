const nodemailer=require("nodemailer");
require("dotenv").config();
const sendMailer= async(email,title,body)=>{
   try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    
  
      let info= await transporter.sendMail({
        from: "adcomdiya@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: `${title}`, // Subject line
        html: `${body}`, // html body
      });
     
      //console.log(info);
      return info;


   } catch (error) {
    console.log(error.message);
   }
         
}
module.exports=sendMailer;
