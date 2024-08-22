const express= require("express");
const router=express.Router();

const {
login,signup,sendOtp,changepassword
}    = require("../controllers/Auth");

const {resetpasswordtoken,resetpassword}=require("../controllers/Resetpassword");

const {auth}= require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);
router.post("/sendotp",sendOtp)

router.post("/changepassword",auth,changepassword);

router.post("/reset-passwordtoken",resetpasswordtoken);
router.post("/reset-password",resetpassword);


module.exports = router;