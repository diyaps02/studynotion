const express= require("express");
const router=express.Router();

const {
capturepayment,verifySignature,sendPaymentSuccessulEmail
}    = require("../controllers/Payments");

const {auth,isAdmin,isInstructor,isStudent}= require("../middleware/auth");

router.post("/capturepayment",auth,isStudent,capturepayment);
router.post("/verifypayment",auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessulEmail)

module.exports=router;
