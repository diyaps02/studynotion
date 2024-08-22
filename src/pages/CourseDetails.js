import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { getcoursedetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import ConfirmationModal from "../components/common/Conformationmodal"; 
import RatingStars from "../components/common/RatingStars";
import Spinner from "../components/common/Spinner";
import { setloading } from "../slices/profileslice";
import CourseDetailCard from "../components/core/Courses/CourseDetailCard";
import {formatDate} from "../services/formatDate";

const CourseDetails = () => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {loading}=useSelector((state)=>state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [confirmationmodal,setConfirmationmodal]=useState(null);
  const [totalNoOfLectures,setTotalNoOfLectures]=useState(0);
  const [courseData,setCourseData]=useState(null);
  const [avgReviewCount,setAvgReviewCount]=useState(0);
  

  useEffect(()=>{
   const getCourseDetails=async()=>{
    try {
      setloading(true);
      const result=await getcoursedetails(courseId,token);
      setCourseData(result?.coursedetails);
      setloading(false);
    } catch (error) {
      console.log("could not fetch course details");
    }
   }
   getCourseDetails();
  },[courseId]);
console.log("courseData",courseData);
  useEffect(()=>{
    const count=GetAvgRating(courseData?.ratingreviews);
    setAvgReviewCount(count);
    },[courseData])

  useEffect(()=>{
  let lectures=0;
  courseData?.courseContent?.forEach((sec) => {
    lectures+=sec.subsection?.length||0 
  });

    setTotalNoOfLectures(lectures);
    },[courseData]);

    const [isActive,setIsActive]=useState(Array(0));
    const handleActive=(id)=>{
      setIsActive(
        !isActive.includes(id)
        ?isActive.concat(id)
        :isActive.filter((e)=>e!=id)
      )
    }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user._id, navigate, dispatch);
      return;
    }
setConfirmationmodal({
  text1:"You are not logged in",
  text2:"Please login to purchase the course",
  btn1Text:"Login",
  btn2Text:"Cancel",
  btn1Handler:()=>navigate("/login"),
  btn2Handler:()=>setConfirmationmodal(null),
})

  };

if(loading||!courseData){
  return(
    <div>
     <Spinner/>
    </div>
  )
}



  return (
    <div className="flex flex-col text-white relative">
    <div className="flex w-full py-8 bg-richblack-800">
    <div className="flex w-[62%] border-r border-richblack-500 flex-col  p-4 px-40 gap-2">
     <p className="text-4xl font-bold text-richblack-5">{courseData.coursename}</p>
      <p className="text-richblack-200">{courseData.coursedescription}</p>
      <div className="text-md flex flex-wrap items-center gap-2">
        <span className="text-yellow-25"  >{avgReviewCount}</span>
        <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
        <span>{courseData?.ratingreviews?.length}reviews</span>
        <span>{courseData?.studentsEnrolled?.length} student enrolled</span>
      </div>
      <div>
        Created by:{courseData?.instructor?.firstname} {courseData.instructor.lastname}
      </div>
      <div className="flex flex-wrap gap-5 text-lg">
        <p className="flex items-center gap-2">
          <BiInfoCircle/>Created at:{formatDate(courseData?.createdAt)}
        </p>
        <p className="flex items-center gap-2"> <HiOutlineGlobeAlt />English </p>
      </div>
     </div>
      <div>

      </div>
    </div>

      <div className="absolute right-56 top-8">
        <CourseDetailCard 
        course={courseData} 
        handleBuyCourse={handleBuyCourse} 
        setConfirmationmodal={setConfirmationmodal}
        />
      </div>
      
      <div className="my-8 ml-40 w-[52.5%] border border-richblack-600 p-8">
        <p className="text-3xl font-semibold">What You Will Learn</p>
        <div className="mt-5">
          {courseData?.whatYouWillLearn}
        </div>
      </div>

      <div className="ml-40 w-[52.5%]" >
        <div className="flex flex-col gap-3">
        <p className="text-[28px] font-semibold">Course Content</p>
        <div className="flex gap-x-3">
         <span> {courseData?.courseContent?.length}section(s) </span>
         <span>{courseData?.courseContent?.subsection?.length||0} lecture(s) </span>
         <span>{courseData?.duration}</span>
          </div>
        </div>
      </div>
      <div >
        <button 
        className="text-yellow-25 ml-40 m-2"
        onClick={()=>setIsActive([])}>
        Collapse all sections
        </button>
      </div>
      <div  className="mb-12 py-4 ml-40 w-[52.5%]">
        <p className="text-2xl font-semibold">Author</p>
        <div className="flex items-center gap-4 py-4">
          <img src={courseData?.instructor?.image } className="w-[50px] h-[50px] rounded-full object-cover" />
         {courseData?.instructor?.firstname} {courseData?.instructor?.lastname}
         </div>
        </div> 
    {confirmationmodal&&<ConfirmationModal modalData={confirmationmodal}/>}

    </div>
  );
};

export default CourseDetails;
