import React, { useState } from 'react'
import Loginsignin from '../components/Extras/Loginsignin'
import CTAbutton from '../components/core/homepage/CTAbutton';
import  Frame from "../assets/frame (2).png";
import Forgotpassword from "../pages/Forgotpassword"
import Loginimage from "../assets/login.webp"
import { login } from '../services/operations/authAPI';
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const Loginpage = () => {

  const navigate=useNavigate();
  const {loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
const [formdata,setformdata]=useState({
  email:"",
  password:""
})
const handleonchange=(e)=>{
  setformdata((prev)=>({
    ...prev,
    [e.target.name]: e.target.value
  }));
}
const handlesubmit=(e)=>{
 e.preventDefault();
 dispatch(login(formdata.email,formdata.password,navigate));
}
  return (
   <div>
    {
      loading?(<div><Spinner/></div>):( <div className='w-100 text-white flex p-6'>
        <div className='w-[50%] pt-40 pl-32'>
          <Loginsignin
           title={"Welcome Back"} 
          description={"Build skills for today, tomorrow, and beyond."} 
          quote={"Education to future-proof your career."}
          />
          <form className='flex flex-col mt-4 gap-4' onSubmit={handlesubmit}>
          <div className='mt-2'>
            <p>Email Address</p>
            <input type='email' name='email' value={formdata.email} onChange={handleonchange} className=' bg-richblack-700 rounded-md p-3 w-[70%]  border-b border-richblack-300' placeholder='Enter email address' />
          </div>
  
         <div>
          <p>Password</p>
          <input type='password' name='password' value={formdata.password} onChange={handleonchange} className=' bg-richblack-700 rounded-md p-3 w-[70%]  border-b border-richblack-300' placeholder='Enter Password'/>   
          </div>       
           
           <div className='text-blue-50 text-sm font-edu-sa ml-80 cursor-pointer' onClick={()=>navigate("/reset-password")}>Forgot Password</div>
  
            <button className= 'bg-yellow-50 w-fit py-2 px-8 ml-36 rounded-md ' type='submit'>
              Login
            </button>
          </form>
        </div>
       <div className='w-[50%] relative p-28 pl-32 pt-44'>
        <img src={Frame} className='' width={458}
                height={404}/>
        <img src ={Loginimage} className={`absolute bottom-36 left-28 w-[61%]`} width={458} height={404}/>
        </div> 
      </div>)
    }
   </div>
  )
}

export default Loginpage;
