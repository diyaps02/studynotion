import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import Spinner from "../components/common/Spinner";
import {getfullcoursedetails} from "../services/operations/courseDetailsAPI"
import VideoDetailsSidebar from '../components/core/viewcourse/VideoDetailsSidebar';
import VideoDetails from '../components/core/viewcourse/VideoDetails';
import {setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,setCompletedLectures} from "../slices/viewCourseslice";
import CourseReviewModal from '../components/core/viewcourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const [loading,setLoading]=useState(false);
    const {token}= useSelector((state)=>state.auth);
    const dispatch=useDispatch();

useEffect(()=>{
    const setCourseSpecificDetails=async()=>{
       try {
        setLoading(true);
        const courseData=await getfullcoursedetails(courseId,token);
       dispatch(setCourseSectionData(courseData?.coursedetails?.courseContent));
       dispatch(setEntireCourseData(courseData?.coursedetails));
       dispatch(setCompletedLectures(courseData?.completedVideos));
      let lectures=0;
      courseData?.coursedetails?.courseContent?.forEach(sec => {
        lectures+=sec?.subsection?.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
      setLoading(false);
       } catch (error) {
        toast.error("error retrieving course details");
        console.log("error=>",error);
       }
    } 
    setCourseSpecificDetails();
   
},[]);

  return (
   <>
  {
    loading?(<div><Spinner/></div>):( <div className='flex w-full'>
      <VideoDetailsSidebar setReviewModal={setReviewModal}/>
   
       <div className='w-[84%] '>
      <Outlet/>
       </div>
       {
          reviewModal&& <CourseReviewModal setReviewModal={setReviewModal}/>
       }
     </div>)
  }
   </>
  )
}

export default ViewCourse;
