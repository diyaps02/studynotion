import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiMiniPencil } from "react-icons/hi2";
import { MdChat } from "react-icons/md";
import { MdTimer } from "react-icons/md";
import {convertSeconds} from "../../../../utils/sectoHrconvertor";
import {Table,Thead,Th,Tr,Td,Tbody} from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/Conformationmodal';
import { getInstructorCourseDetails } from '../../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import {formattedDate} from '../../../../utils/dateFormatter';
import { deleteCourse } from '../../../../services/operations/courseDetailsAPI';
import { getdoubtRoomdetails } from '../../../../services/operations/doubtAPI';
import Spinner from '../../../common/Spinner';
export default function CourseTable({courses,setCourses}){
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();
    const [confirmationModal,setConfirmationModal]=useState(null);



const handleCourseDelete=async(id)=>{
    setloading(true);
    await deleteCourse({courseId:id},token);
    const result=await getInstructorCourseDetails({instId:user._id},token);
    if(result){
        setCourses(result);
    }
    setConfirmationModal(null);
    setloading(true);
}

const getChatroomDetails=async(id)=>{
  try {
    const chatname=id+"-Doubt-Group";
    setloading(true);
    const result =await getdoubtRoomdetails(chatname,token);
    console.log("result",result);
   if(result){
    const chatId=result?._id;
    navigate(`/doubt/${chatId}`);
   }
   setloading(false);

  } catch (error) {
    console.log("ERROR",error);
  }
}

console.log(courses);
  return (
    <div>
      {
        loading?(<div><Spinner/></div>):(<div className='text-white w-full'>
          <Table >
            <Thead>
            <Tr  className="flex gap-x-10 text-sm  border border-richblack-800 p-2 text-richblack-100   justify-between px-10 w-[90%]">
                <Th>Courses</Th>
               <div className='flex gap-28'>
               <Th>Duration</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
               </div>
              </Tr>
            </Thead>
            <Tbody>
            {
            courses.length===0?(<Tr><Td>You do not own any course yet</Td></Tr>):
            (
                courses?.map((course)=>(
                    <Tr key={course._id} className="flex gap-x-20 border border-richblack-800 w-[90%] items-center p-2">
                     <Td className="flex w-[100%]   ">
                      <img src={course.thumbnail}
                      className='h-[150px] w-[220px] rounded-lg object-cover'
                      />    
                    <div className='flex flex-col gap-1 ml-5 mt-3'>
                    <h1 className='text-xl font-semibold font-inter'>{course.coursename}</h1>
                    <p className='text-richblack-300'>{course.coursedescription}</p>
                    <p className='text-richblack-50'>Created:{formattedDate(course.createdAt)}</p>
                    {
                        course?.status===COURSE_STATUS.DRAFT?(
                            <p className='text-pink-50 rounded-full p-1 flex items-center gap-2'><MdTimer/> Drafted</p>
                        ):(<p className='text-yellow-50 rounded-full p-1 flex'>Published</p>)
                    }
                    </div>
                     </Td> 
                     <Td className="flex justify-end items-center  w-[20%]">
                        {convertSeconds(course.totalduration)}
                    </Td>  
                    <Td className="w-[20%] items-center flex justify-center">
                        {course.price}
                    </Td>
                    <Td className="flex gap-2">
                     <button 
                     onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}>
                        <HiMiniPencil/>
                     </button>
                     <button onClick={()=>setConfirmationModal({
                        text1:"Do you want to delete this course?",
                        text2:"All the data related to this course will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:!loading?(()=>handleCourseDelete(course._id)):(()=>{}),
                        btn2Handler:!loading?(()=>setConfirmationModal(null)):(()=>{}),
                     })}>
                        <RiDeleteBin6Fill/>
                     </button>
                     <button onClick={()=>getChatroomDetails(course.coursename)}>
                          <MdChat size={18}/>
                        </button>
                     {/* {
                      course?.status==COURSE_STATUS.PUBLISHED&&
                      course?.studentsEnrolled.length>0&&(
                        <button onClick={()=>navigate(`/doubt/`)}>
                          <MdChat size={25}/>
                        </button>
                      )  
                     } */}
                    </Td>
                </Tr>
                ))
            )
            }
            </Tbody>
          </Table>
          {
            confirmationModal&&<ConfirmationModal modalData={confirmationModal} />
          }
        </div>)
      }
    </div>
  )
}

