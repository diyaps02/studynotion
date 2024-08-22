const express= require("express");
const router=express.Router();

const {
getAllCourses,getcoursedetails,getfullcoursedetails,createcourse,editcourse,deleteCourse,instructorCourseDetails
}    = require("../controllers/Courses");

const {updateCourseProgress}=require("../controllers/Courseprogress");

const {getChatroomDetails}=require("../controllers/ChatRoom");
const {createMessage,getMessages,delteMessage}=require("../controllers/Message");

const {createsection,updatesection,deletesection}=require("../controllers/Section");
const {createsubsection,updatesubsection,deletesubsection}=require("../controllers/Subsection");

const {createcatagory,getallcategories,categorypageDetails}= require("../controllers/Category");

const {createRating,getallreviews,getaveragerating}=require("../controllers/Ratingreviews");

const {auth,isAdmin,isInstructor,isStudent}=require("../middleware/auth");



router.post("/createcourse",auth,isInstructor,createcourse);
router.get("/getallcourses",getAllCourses);
router.post("/getcoursedetails",auth,getcoursedetails);
router.post("/getfullcoursedetails",auth,getfullcoursedetails)
router.post("/instructorcoursedetails",auth,isInstructor,instructorCourseDetails);
router.post("/deletecourse",auth,isInstructor,deleteCourse);
router.post("/editcourse",auth,editcourse);

router.post("/createsection",createsection);
router.post("/updatesection",updatesection);
router.post("/deletesection",deletesection);

router.post("/createvideo",createsubsection);
router.post("/updatevideo",auth,updatesubsection);
router.post("/deletevideo",deletesubsection);

router.post("/createcategory",auth,isAdmin,createcatagory);
router.get("/getallcategories",getallcategories);
router.post("/categorypagedetails",categorypageDetails);

router.post("/updateCourseProgress",auth,updateCourseProgress);

router.post("/createrating",auth,isStudent,createRating);
router.get("/getallrating",getallreviews);

router.post("/getChatroomDetails",auth,getChatroomDetails);

router.post("/sendmessage",auth,createMessage);
router.post("/getmessages",auth,getMessages);
router.post("/deletemessage",delteMessage);

module.exports=router;