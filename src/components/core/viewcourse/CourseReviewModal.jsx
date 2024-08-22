import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import Ratingstars from 'react-rating-stars-component';
import Iconbtn from '../../common/Iconbtn';
import {createRating} from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {

    const {user}= useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const {courseEntireData}=useSelector((state)=>state.viewCourse);
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();


const ratingChanged=(newrating)=>{
    setValue("courseRating",newrating);
}
console.log("hello u r inside review modal")
useEffect(()=>{
    setValue("courseExperience","");
        setValue("courseRating",0);
},[])

const onSubmit=  async(data)=>{
       await createRating({
        courseId:courseEntireData?._id,
        rating:data.courseRating,
        review:data.courseExperience,
       },token); 
}

  return (
    <div  className='backdrop-blur-sm inset-0  bg-opacity-10 z-10 fixed '>
      <div className='bg-richblack-800 text-white rounded-xl w-[40%] left-5 mx-auto mt-36'>
        <div className='flex justify-between p-2 border-b border-richblack-200 bg-richblack-700 py-4 px-4 '>
            <p>Add Review</p>
            <button onClick={()=>setReviewModal(false)}>
                <IoMdClose className="text-2xl text-richblack-5" />
            </button>
        </div>
        {/* modal body */}
        <div className='p-6'>
            <div className="flex items-center justify-center gap-x-4">
                <img src={user?.image}
                alt='user image'
                className='aspect square w-[50px] rounded-full object-cover'
                />
             <div className='flex flex-col'>
             <p className="font-semibold text-richblack-5">{user?.firstname} {user?.lastname}</p>
                <p className="text-sm text-richblack-5">Posting Publicly</p>
             </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} 
            className="mt-6 flex flex-col items-center" 
            >
                <Ratingstars
                count={5}
                size={24}
                onChange={ratingChanged}
                activeColor='#ffd700'/>

                <div className="flex w-11/12 flex-col space-y-2">
                    <label htmlFor='courseExperience'>
                        Add Your Experience <sup className="text-pink-200">*</sup>
                    </label>

                    <textarea 
                    id='courseExperience'
                    placeholder='Add Your Experiance here'
                    {...register("courseExperience",{required:true})}
                    className="form-style resize-x-none min-h-[130px] w-full bg-richblack-600 rounded-md"
                    />
                    {
                        errors.courseExperience &&(
                            <span>Please add your Experience</span>
                        )
                    }
                </div>
            {/* cancel and save button */}
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
             <button onClick={()=>setReviewModal(false)}
             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
             >
                Cancel
             </button>
             <Iconbtn
             type="submit"
             text="Save"
             customclasses={"bg-yellow-50 text-black font-semibold p-2 rounded-md"}
             />
            </div>
            </form>

        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal;
