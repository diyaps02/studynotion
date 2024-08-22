import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { resetpassword } from '../services/operations/authAPI';
import { Link, useLocation, useParams } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const Updatepassword = () => {
  const dispatch=useDispatch();
  const location =useLocation();
  const {token} =useParams();
    const [showpassword,setshowpassword]= useState(false);
    const [showconfirmpassword,setshowconfirmpassword]=useState(false);

    const [formdata,setformdata]=useState({
      password:"",confirmpassword:""
    });
    const {loading}= useSelector((state)=> state.auth);
    const {password,confirmpassword}= formdata;
    const handleonchange=(e)=>{
     setformdata((prevdata)=>(
      {
        ...prevdata,
        [e.target.name]:e.target.value,
      }
     ))
    }
    const handleonsubmit=(e)=>{
      e.preventDefault();
     // const token=location.pathname.split('/').at(-1);
      console.log("password:",password,"confirmpassword:",confirmpassword);
      dispatch(resetpassword(password,confirmpassword,token));
    }
  return (
    <div className='mx-auto bg-richblack-800 text-white p-3 rounded-md my-20'>
      {
        loading? (<div><Spinner/></div>):(<div className='flex flex-col gap-3 p-4 px-12'>
            <h1 className='text-2xl font-bold'>Choose Your Password</h1>
            <p>Almost done.Enter your new password and you're all set.</p>
            <form onSubmit={handleonsubmit}>
            <label htmlFor='password'>New Password</label>
                <div className='flex gap-2 items-center bg-richblack-600 px-3 rounded-md mt-2 mb-4'>
                    <input
                    required
                    type={showpassword?"text":"password"}
                    name='password'
                    value={password}
                    onChange={handleonchange}
                    placeholder='Password'
                    className='w-full p-3 bg-richblack-600 text-richblack-5 outline-none'
                    />
                    <span
                    onClick={()=>setshowpassword((prev)=>!prev)}>
                      {
                        showpassword?<FaEyeSlash fontSize={24}/>:<FaEye fontSize={24}/>
                      }
                    </span>
                </div>
                <label htmlFor='confirmpassword'>Confirm New Password</label>
                <div className='flex gap-2 items-center bg-richblack-600  px-3 rounded-md mt-4 mb-4'>
                    <input
                    required
                    type={showconfirmpassword?"text":"password"}
                    name='confirmpassword'
                    value={confirmpassword}
                    onChange={handleonchange}
                    placeholder='Confirm Password'
                    className='w-full p-3  bg-richblack-600 text-richblack-5 outline-none '
                    />
                    <span
                    onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
                      {
                        showconfirmpassword?<FaEyeSlash fontSize={24}/>:<FaEye fontSize={24}/>
                      }
                    </span>
                </div>
                <button type='submit' className= ' rounded-md bg-yellow-50 py-2 px-3 mt-2 mb-2'>
                  Reset Password
                </button>
            </form>
            <Link to={"/login"}>
            <p className=' hover:text-blue-100'>Back to login</p>
            </Link>
        </div>)
      }
    </div>
  )
}

export default Updatepassword;
