import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Spinner from '../../common/Spinner';
import { HiMiniPencil } from "react-icons/hi2";
import { getInstructorCourseDetails } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Iconbtn from '../../common/Iconbtn';
import CourseTable from './InstructorCourse/CourseTable';
const Mycourses = () => {
    const {token}= useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);

const InstructorCourseDetails=async()=>{
    setLoading(true);
    const result= await getInstructorCourseDetails({instId:user._id},token); 
    if(result){
      setCourses(result);
    }   
    setLoading(false);
}

useEffect(()=>{
  InstructorCourseDetails();
},[])

  return (
    <div>
      {
        loading?(<div><Spinner/></div>):(<div className='w-full'>
          <div className='flex text-white p-2 justify-between  mr-32 my-5'>
            <h1 className='text-2xl font-bold font-inter'>My Courses</h1>
            <Iconbtn
             text={"Add Course"}
             customclasses={"font-bold text-xl flex items-center gap-2 p-2 bg-richblack-700 rounded-md "}
            onclick={()=>navigate("/dashboard/add-course")}
             ><IoIosAddCircleOutline/></Iconbtn>
          </div>
          {
            courses&&<CourseTable courses={courses} setCourses={setCourses}/>
          }
        </div>)
      }
    </div>
  )
}

export default Mycourses;
