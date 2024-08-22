const express = require("express");
const router = express.Router();

const {createprofile,deleteaccount,getalluserdetails,updateDisplayPicture,getEnrolledCourses,instructorDashboard, updateprofile}=require("../controllers/Profile");
const { auth, isAdmin, isInstructor,isStudent } = require("../middleware/auth");

router.post("/createprofile", auth, createprofile);
router.delete("/deleteaccount",auth,deleteaccount);
router.get("/getallusers",getalluserdetails);
router.get("/enrolled-courses",auth,isStudent,getEnrolledCourses);
router.put("/updatedisplay",auth,updateDisplayPicture);
router.post("/updateProfile",auth,updateprofile);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);
module.exports = router;
