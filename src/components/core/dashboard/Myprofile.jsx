import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconbtn from '../../common/Iconbtn';

const Myprofile = () => {
    const {user}= useSelector((state)=>state.profile);
    const navigate=useNavigate();
  return (
    <div className='text-white  py-8'>
      <h1 className='text-4xl text-white'>
        My Profile
      </h1>
      <div className='w-[70%] ml-20 mt-16 flex flex-col gap-5'>
        <div className='bg-richblack-800 rounded-lg border-richblack-600 border-[1px] flex justify-between px-8 py-8'>
           <div className='flex gap-6'>
           <img src={user?.image}
            alt={`profile-${user?.firstname}`}
            className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className='flex flex-col justify-center'>
                <p className='text-xl font-semibold '>{user?.firstname+" "+ user?.lastname}</p>
                <p className='text-richblack-300'>{user?.email}</p>
            </div>
           </div>
            <Iconbtn  
            text={"Edit"}
            customclasses="flex items-center gap-2 bg-yellow-50 w-fit p-2 h-fit text-black rounded-md"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}><FaRegEdit/></Iconbtn>
        </div>
        <div className='bg-richblack-800 rounded-lg border-richblack-600 border-[1px] flex justify-between px-8 py-8 '>

          <div className='flex flex-col text-white gap-6'>
            <h1 className='font-semibold text-xl'>About</h1>
            <p className='text-richblack-50'>
            {
            user?.additionaldetails?.about?`${user.additionaldetails.about}`:"Write Something About Yourself"
            }
            </p>
          </div>
          
          <Iconbtn  
            text={"Edit"}
            customclasses="flex items-center gap-2 bg-yellow-50 w-fit p-2 h-fit text-black rounded-md"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}><FaRegEdit/></Iconbtn>
        </div>
        <div className='bg-richblack-800 rounded-lg border-richblack-600 border-[1px] px-8 py-8 '>
           <div  className='flex justify-between'>
            <h1 className='font-semibold text-xl'>Personal Details</h1>
            <Iconbtn  
            text={"Edit"}
            customclasses="flex items-center gap-2 bg-yellow-50 w-fit p-2 h-fit text-black rounded-md"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}><FaRegEdit/></Iconbtn>
           </div>
           <div className='flex flex-col w-[90%] p-2'>
            <table>
              <tr>
              <td>
              <div className='p-2 bg-richblack-800 flex flex-col gap-1 mb-2'>
              <p className='text-richblack-300'>First Name</p>
              <p>{user?.firstname}</p>
            </div>
              </td>
              <td>
              <div className='p-2 bg-richblack-800 flex flex-col gap-1 mb-2'>
              <p className='text-richblack-300'>Last Name</p>
              <p>{user?.lastname}</p>
            </div>
              </td>
              </tr>
              <tr>
                <td>
                <div className='p-2 bg-richblack-800 flex flex-col gap-1 mb-3'>
              <p className='text-richblack-300'>Email</p>
              <p>{user?.email}</p>
            </div>
                </td>
                <td>
                <div className='p-2 bg-richblack-800 flex flex-col gap-1 mb-3'>
              <p className='text-richblack-300'>Gender</p>
              <p>{user?.additionaldetails?.gender??"Add Gender"}</p>
            </div>
                </td>
              </tr>
              <tr>
                <td>
                <div className='p-2 bg-richblack-800 flex flex-col gap-1 mb-3'>
            <p className='text-richblack-300'>Phone Number</p>
              <p>{user?.additionaldetails?.phone_no??"Add Contact Number"}</p>
            </div>
                </td>
                <td>
                <div className='p-2 bg-richblack-800 flex flex-col gap-1 mb-3'>
            <p className='text-richblack-300'>Date Of Birth</p>
              <p>{user?.additionaldetails?.dob??"Add Date of birth"}</p>
            </div>
                </td>
              </tr>
            </table>      
           </div> 
        
        </div>
      </div>
    </div>
  )
}

export default Myprofile;
