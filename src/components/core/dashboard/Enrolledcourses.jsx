import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { CiMenuKebab } from "react-icons/ci";
import {getUserenrolledcourses} from "../../../services/operations/profileAPI";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../common/Spinner';

const Enrolledcourses = () => {
  const {token}=useSelector((state)=>state.auth);
  const [enrolledCourses, setEnrolledCourses]=useState(null);
  const navigate= useNavigate();

const getenrolledcourses=async ()=>{
  try {
    const response=await getUserenrolledcourses(token);

    setEnrolledCourses(response);
  } catch (error) {
    console.log("unable to fetch enrolled courses");
  }
}

console.log("hello sab theek hai kya");
  useEffect(()=>{
   getenrolledcourses();
  },[]);
  return (
    <div className='text-white'>
      <h1 className='mb-4 mt-4 font-inter font-bold text-2xl'>
            Enrolled Courses
        </h1>
      <div className='mr-20 rounded-md '>
        
        {
          !enrolledCourses ?(<div><Spinner/></div>):!enrolledCourses.length? (<p>You are not enrolled in any course yet</p>):( <div>
            <div className='flex justify-between pr-60 bg-richblack-700 p-3'>
             <p>Course name</p>
             <div className='flex gap-x-60'>
             <p>Duration</p>
             <p>Progress</p>
              </div>
            </div>
            {
              enrolledCourses.map((course,index)=>(

                <div key={index} className='flex bg-richblack-800 border w-[100%] border-richblack-400'>
                  <div onClick={()=>{navigate(`view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subsection?.[0]?._id}`)}}
                  className=' w-[40%] pl-2'
                  >
                    <img src={course.thumbnail} className='w-[75px] aspect-square mt-2 rounded-md' />
                    <div className='flex flex-col w-[50%] mt-2'>
                      <p>
                        {course.coursename}
                      </p>
                      <p className="text-richblack-300 text-md">{course?.coursedescription}</p>
                      </div>
                    </div>
                   <div className='flex gap-x-32 pr-8 items-center w-[60%] pl-20'>
                   <div className='w-[40%] flex justify-center '>
                      {
                        course?.duration
                      }
                      </div>
                      <div className=' w-[60%] flex items-center'>
                       <div className='flex flex-col w-[75%] gap-3'>

                       <p>Progress: {course.progressPercentage||0}%</p>
                        <ProgressBar
                        completed={course.progressPercentage||0}
                        height='8px'
                        isLabelVisible={false}/>
                       </div>
                       <CiMenuKebab className='w-[25%] text-3xl'/>
                        </div>
                    </div>
                  </div>
              ))
            }
          </div>)
        }
      </div>
    </div>
  )

}
export default Enrolledcourses ;
