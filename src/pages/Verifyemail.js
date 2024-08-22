import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import { sendOtp } from '../services/operations/authAPI';
const Verifyemail = () => {
    const {signUpdata,loading}=useSelector((state)=>state.auth);
    const [otp,setotp]=useState("");
    const navigate=useNavigate();   
    const dispatch=useDispatch()
  
   useEffect(()=>{
    if(!signUpdata){
        navigate("/signup");
    }
   },[]);
  const handleonchange=(e)=>{
    e.preventDefault();
    const {
      accounttype,firstname,lastname,email,password,confirmpassword
    }=signUpdata;
    
    dispatch(signUp(accounttype,firstname,lastname,email,password,confirmpassword,navigate,otp));
  }    
  return (
    <div>
      {
        loading ?(<div className=''><Spinner/></div>):(
            <div className=''>
              <div className='mx-auto  w-fit my-32 p-4'>
              <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100 w-10/12">
            A verification code has been sent to you. Enter the code below
          </p>
                <form onSubmit={handleonchange}>
                 <OTPInput
                 value={otp}
                inputStyle={{width:"40px",height:"40px",marginRight:"20px"}}
                 onChange={setotp}
                 numInputs={6}
                 renderSeparator={<span>-</span>}
                 renderInput={(props)=><input {...props} className='text-black text-lg'/>}
                 />
                            <button
              type="submit"
              className=" px-32 bg-yellow-50  py-[12px]  rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>

                </form>
               <div>
               <Link to={"/login"}>
               <p className="w-fit mt-4 flex items-center gap-x-2 rounded-md p-3 px-32 bg-white text-black ">Back to login</p>
               </Link>
               <button onClick={()=>dispatch(sendOtp(signUpdata.email,navigate))} className="flex items-center text-blue-100  p-5 gap-x-2">
                Resend it
               </button>
               </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default Verifyemail;
