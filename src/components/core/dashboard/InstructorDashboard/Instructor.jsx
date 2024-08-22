import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import { getInstructorData,getInstructorCourseDetails } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import Spinner from "../../../common/Spinner";
import InstructorChart from './InstructorChart';
const Instructor = () => {
const [loading,setLoading]=useState(false);
const {user}=useSelector((state)=>state.profile);
const {token}=useSelector((state)=>state.auth);
const [InstructorData,setInstructorData]=useState(null);
const [courses,setCourses]=useState([]);

useEffect(()=>{

const getCourseDataWithStats=async()=>{
    setLoading(true);
    const instructorApiData=await getInstructorData(token);
    const result=await getInstructorCourseDetails({instId:user._id},token);
    if(instructorApiData){
        setInstructorData(instructorApiData);
    }
    if(result){
        setCourses(result);
    }
    setLoading(false);

}
getCourseDataWithStats();
},[]);

const totalAmount=InstructorData?.reduce((acc,curr)=>acc+curr.totalAmountGenerated,0);
const totalStudents=InstructorData?.reduce((acc,curr)=>acc+curr.totalStudentsEnrolled,0);


  return (
    <div className='text-white ml-52 w-[60%]  p-2'>
      <div className='w-[60%]'>
      <h1 className='text-2xl font-inter font-semibold mt-2'>
      Hi, {user.firstname}👋
      </h1>
      <p>Let's start something new</p>
      </div>

      {
        loading?(<div><Spinner/></div>)
        :courses.length>0?(
            <div className='flex flex-col gap-y-6 mt-2'>
              <div className='flex w-full gap-4'>
                <InstructorChart courses={courses}/>
                <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Statistics</p>
        
                    <div >
                      <p className="text-lg text-richblack-200">Total Courses</p>
                      <p className="text-3xl font-semibold text-richblack-50">{courses.length}</p>
                    </div>
                    <div>
                      <p className="text-lg text-richblack-200">Total Students</p>
                      <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                      </div>
                      <div>
                      <p className="text-lg text-richblack-200">Total income</p>
                      <p className="text-3xl font-semibold text-richblack-50">{totalAmount}</p>
                        </div>
                  </div>
              </div>

            <div className="rounded-md bg-richblack-800 p-6">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
            <p className="text-xs font-semibold text-yellow-50">View all</p>
            </Link>
              </div>
              <div className="my-4 flex items-start space-x-6 text-richblack-50">
                {
                  courses?.slice(0,3).map((course,index)=>(
                    <div key={index}>
                      <img className='w-[350px] object-cover'
                      src={course.thumbnail}
                      />
                     <div className='mt-3'>
                     <p>{course.coursename}</p>
                     <div className='flex gap-1'>
                      <p>{course.studentsEnrolled.length} Students</p>
                        <p>|</p>
                        <p>Rs.{course.price}</p>
                      </div>
                     </div>
                      </div> 
                  ))
                }
              </div>
            </div>
           
            </div>
        ):(<div>
          <p>You have not created any courses yet</p>
          <Link to={"/dashboard/addCourse"}>
          Create a Course
          </Link>
        </div>)
        
      }

    </div>
  )
}

export default Instructor;
