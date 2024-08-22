const User = require("../models/user");
const Otp = require("../models/Otp");
const Profile = require("../models/profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMailer = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

//send otp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    //not a good logic coz we have to call database again and again while finding result so try to use libraries which create unique otps only
    const otppayload = { email, otp };
    const otpbody = await Otp.create(otppayload);
    res.status(200).json({
      success: true,
      message: "otp generated successfully",
      otp: otp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating otp",
      error,
    });
  }
};

//signup
exports.signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
    accounttype,
    otp,
  } = req.body;
  try {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword ||
      !accounttype||
      !otp
    ) {
      res.status(403).json({
        success: false,
        message: "all fields required",
      });
    }
    if (password != confirmpassword) {
      res.status(400).json({
        success: false,
        message: "password does not match",
      });
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    const recentotp = await Otp.find({ email })
      .sort({ createdat: -1 })
      .limit(1);
      console.log("recentotp",recentotp);
    if (recentotp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp !== recentotp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "otp is incorrect",
      });
    }
    let hashedpassword = await bcrypt.hash(password, 10);
    let profiledetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      phone_no: null,
    });
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      password: hashedpassword,
      email: email,
      accounttype:accounttype,
      additionaldetails:profiledetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastname}`,
    });
    res.status(200).json({
      success: true,
      user: user,
      message: "user signup successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user signup failed",
    });
  }
};
//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all fields",
      });
    }
    let existuser = await User.findOne({ email }).populate("additionaldetails");
    if (!existuser) {
      return res.status(400).json({
        success: false,
        message: "could not login user does not exist",
      });
    }
    if (await bcrypt.compare(password, existuser.password)) {
      const payload = {
        email: existuser.email,
        id: existuser._id,
        role: existuser.accounttype,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24hr",
      });
      existuser = existuser.toObject();
      existuser.token = token;
      const options = {
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 3),
        httpOnly: true,
      };
      res.cookie("token", token, options).json({
        success: true,
        user: existuser,
        token: token,
        message: "user logged in successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "login failed,please try again",
    });
  }
};

//reset password
exports.changepassword = async (req, res) => {
  try {
    const {oldpassword, newpassword} = req.body;
    const {email}= req.user;
    const user = await User.findOne({email});
    if (!oldpassword || !newpassword ) {
      return res.status(400).json({
        success: false,
        message: "fill password correctly",
      });
    }
    if (await bcrypt.compare(oldpassword, user.password)) {
      let hashedpassword = await bcrypt.hash(newpassword, 10);
      const passupdate = await User.findByIdAndUpdate(
        {_id:user._id},
        { password: hashedpassword },
        { new: true }
      );
      const info = await sendMailer(
        email,
        "Password for your account has been updated",
        passwordUpdated(email, `Password updated successfully for ${user.firstname} ${user.lastname}`)
      );
      return res.status(200).json({
        success: true,
        message: "password changed successfully",
      });
    }
    else{
      return res.status(404).json({
        success:false,
        message:"Password didn't match with the database"
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "something went wrong while changing the password,please try again",
    });
  }
};
