import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {apiConnector} from "../../services/apiconnector";
import { contact } from '../../services/apis';
import CountryCode from "../../Data/Country-code";
import { DevTool } from '@hookform/devtools';


const ContactForm = () => {
const [loading,setloading]= useState(false);
const {register,
       handleSubmit,
       reset,
       formState:{errors,isSubmitSuccessful},
       control
    }=useForm();

const submitContactForm = async(data)=>{
  try {
    console.log("logging data",data);
    setloading(true);
    const response = await apiConnector("POST" , contact.CONTACT_API , data)
    console.log(" contact us response=>",response);
    setloading(false);
  } catch (error) {
   console.log("error while contacting us",error.message);
   setloading(false);    
  }
}    
useEffect(()=>{
  if(isSubmitSuccessful){
     reset({ 
      email:"",
      firstname:"",
      lastname:"",
      message:"",
      phoneNo:"",
     })
  }
},[isSubmitSuccessful]);


  return (
    <div className='mx-auto mt-8 pl-12 '>
    <form className='text-white' onSubmit={handleSubmit(submitContactForm)}>
    <div className='flex flex-col gap-8 justify-center'>
    <div className='flex gap-6 w-[86.5%]'>
         <div className=' flex flex-col w-[50%]'>
          <label htmlFor='firstname'>First Name</label>
          <input
          type='text'
          name='firstname'
          id='firstname'
          className=' bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3'
          placeholder='Enter first name'
          {...register("firstname",{required:true})}
          />
          {
            errors.firstname &&(
              <span>
                Please enter Your name
              </span>
            )
          }
          </div>
          <div className='flex flex-col w-[50%]'>
          <label htmlFor='lastname'>Last Name</label>
          <input
          type='text'
          name='lastname'
          id='lastname'
          className='  bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 '
          placeholder='Enter last name'
          {...register("lastname")}
          />
          {
            errors.firstname &&(
              <span>
                Please enter Your name
              </span>
            )
          }
          </div>
       
      </div> 
      <div className='flex flex-col'>
          <label htmlFor='email'>Email Address</label>
          <input
           type='email'
           name='email'
           className=' bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 w-[92%]'
           placeholder='Enter email Address'
           {...register("email",{required:true})} />
           {
            errors.email&&(
              <span>
                Pease enter your email address
              </span>
            )
           }
        </div>
        {/* phone no */}
        <div>
          <label htmlFor='phoneNo'>
            Phone Nmuber
          </label>
         <div className='flex  w-[92%] gap-0 '>
         <div className='w-[20%] h-fit'>
            <select name='dropdown' id='dropdown' {...register("countrycode",{required:true})}
            className=' bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 w-20 h-12'
            >
              {
               CountryCode.map((ele,index)=>{
                return (
                  <option key={index} >
                    {ele.code}-{ele.country}
                  </option>
                )
               })
              }
            </select>
          </div>
          <div className='w-[80%] '>
            <input type='number'
             name='phonenumber'
             id='phonenumber'
             placeholder='12345 67890'
             className=' bg-richblack-700 border-b-2 border-richblack-300 w-[100%] rounded-md p-3'
             {...register("phoneNo",{required:true,maxLength:{value:10,message:"Invalid phone number"},minLength:{value:8,message:"Invalid Phone Number"}})}
            />
          </div>
         </div>
        </div>
        {
          errors.phoneNo && (
            <span>
              {errors.phoneNo.message}
            </span>
          )
        }
        {/* message */}
        <div>
          <label htmlFor='message'>
          <textarea
           name='message'
           id='message'
           className=' bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 w-[92%]'
           cols={30}
           rows={7}
           placeholder='Enter Your Message Here'
           {...register("message",{required:true})}
          />
{
  errors.message&&(
    <span>
      Please Enter Your Message
    </span>
  )
}
          </label>
          </div>
      <button type='submit' className=' w-[92%] rounded-md font-bold bg-yellow-50 px-6 text-black text-[16px] text-center p-3
      '>
       Send Message
      </button>
    </div>
    </form>
      <DevTool control={control}/>   
      </div>
  )
}

export default ContactForm;
