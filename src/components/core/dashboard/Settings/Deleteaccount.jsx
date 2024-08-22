import React from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { deleteprofile } from '../../../../services/operations/settingsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Deleteaccount = () => {

  const {token}=useSelector(((state)=>state.auth));
  const navigate =useNavigate();
  const dispatch=useDispatch();

  return (
    <div className=' bg-pink-900 rounded-lg border-pink-700 border-[1px] flex gap-6 px-8 py-8'>
      
      <div className='bg-pink-700  rounded-full text-pink-300 flex p-3 h-[40%] mt-1'>
      <RiDeleteBin6Fill className='text-pink-300 text-2xl'/>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-xl text-pink-5'>Delete Account</h1>
        <p className='text-pink-25'>Would you like to delete this account</p>
        <p className='text-pink-25'>This account contains Paid courses. Deleting your account will remove all the contain associated with it.</p>
        <p className='text-pink-400 font-inter mt-1 cursor-pointer' onClick={()=>dispatch(deleteprofile(navigate,token))}>I want to delete my account</p>
      </div>
    </div>
  )
}

export default Deleteaccount;
