import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changepassword } from '../../../../services/operations/settingsAPI';
import { useForm } from 'react-hook-form';
import Iconbtn from '../../../common/Iconbtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Changepassword = () => {
  const navigate = useNavigate();
  const [showpassword,setshowpassword]=useState(false);
  const [shownewpassword,setshownewpassword]=useState(false);
  const formData = new FormData();
  const {token} = useSelector((state)=>state.auth);
  const {handleSubmit,register,setValue,getValues,formState:{errors}}=useForm();

const onSubmit=async(data)=>{
  console.log("peidcure")
  formData.append("oldpassword", data.password);
  formData.append("newpassword", data.newpassword);
  try{
  const result = await changepassword(formData,token);
  if(result){
    console.log("Password Updated");
  }
  setValue("password","")
  setValue("newpassword","")
  }catch(err){
    console.log(err);
  }
  
  }
 
  return (
    <div className='bg-richblack-800 rounded-lg border-richblack-600 border-[1px] px-8 py-8 text-richblack-5'>
   <form onClick={handleSubmit(onSubmit)}>
   <h1 className='font-semibold text-xl'>Password</h1>
      <div className='flex flex-row gap-10 mt-3 w-full'>
        <div className='flex flex-col gap-2  w-[40%]'>
         <label htmlFor='password'>Current Password</label>
         <div className='flex items-center  bg-richblack-700 rounded-md p-3  border-b border-richblack-300 gap-3 '>
         <input
         type={showpassword?'text':'password'}
         id='password'
         placeholder='Enter current password'
         className=' bg-richblack-700 outline-none '
         {...register("password",{required:true})}
         />
       <span className='absolute ml-80  ' onClick={()=>setshowpassword((prev)=>!prev)}>
       {
          showpassword?(<FaEyeSlash/>):(<FaEye/>) 
       }
       </span>
         </div>
         {errors.password && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your password.
                </span>
              )}
        </div>
        <div className='flex flex-col gap-2  w-[40%]'>
         <label htmlFor='newpassword'>New Password</label>
         <div className='flex items-center  bg-richblack-700 rounded-md p-3  border-b border-richblack-300 gap-3'>
         <input
         type={shownewpassword?'text':'password'}
         id='newpassword'
         placeholder='Enter new password'
         className=' bg-richblack-700 outline-none' 
        {...register("newpassword",{required:true})}
         />
           
        <span onClick={()=>setshownewpassword((prev)=>!prev)} className='absolute ml-80'>
        {
          shownewpassword?<FaEyeSlash/>:<FaEye/>
         }
        </span>
          </div>
          {errors.newpassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter new password.
                </span>
              )}
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6 ">
      <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
      <Iconbtn
              type={"submit"}
              text={"Save"}
              customclasses={
                "bg-yellow-50 rounded-md h-fit p-2 text-black px-4"
              }
            />
            </div>
   </form>

    </div>
  )
}

export default Changepassword;
