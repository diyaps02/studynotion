import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { setCourse, setEditcourse, setStep } from '../../../../../slices/courseslice';
import { useForm } from 'react-hook-form';
import Spinner from "../../../../common/Spinner";
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import Iconbtn from '../../../../common/Iconbtn';
import { fetchCourseCategories,editCourseDetails,addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { DevTool } from '@hookform/devtools';
import Requirements from './Requirements';
import Chipinput from './Chipinput';
import UploadImage from './UploadImage';

const CourseInfoForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
        control
    }=useForm();

    const dispatch=useDispatch();
    const {token}= useSelector((state)=>state.auth);
    const {course,editcourse}= useSelector((state)=>state.course);
    const [loading,setloading]=useState(false);
    const [courseCategories,setcourseCategories]=useState([]);

    const getcategories= async()=>{
        setloading(true);
        const categories= await fetchCourseCategories()||0;
        if(categories.length>0){
            setcourseCategories(categories);
        }
        setloading(false);

    }
    useEffect(()=>{
        if(editcourse){
            console.log("course",course);
            setValue("courseTitle",course?.coursename);
            setValue("courseShortDesc",course?.coursedescription);
            setValue("coursePrice",course?.price);
            setValue("courseTags",course?.tag);
            setValue("courseBenefits",course?.whatYouWillLearn);
            setValue("courseCategory",course?.category[0]?.name);
            setValue("courseRequirements",course?.instructions);
            setValue("courseImage",course?.thumbnail);
        }
     getcategories()
    },[])
const isFormUpdated=()=>{
    const currentvalue= getValues();
    if(currentvalue.courseTitle!==course.coursename||
        currentvalue.courseShortDesc!==course.coursedescription||
        currentvalue.coursePrice!==course.price||
        currentvalue.courseTags.toString()!==course.tag.toString()||
        currentvalue.courseBenefits!==course.whatYouWillLearn||
        currentvalue.courseCategory!==course.category||
        currentvalue.courseRequirements.toString()!==course.instructions.toString() ||
       currentvalue.courseImage!=course.thumbnail
    )
   return true;

   else{
    return false;
   }
}

    const onSubmit=async(data)=>{
     if(editcourse){
        if(isFormUpdated()){
        const currentvalue=getValues();
        const formdata= new FormData();

        formdata.append("courseId",course?._id);
        if(currentvalue.courseTitle!==course?.coursename){
            formdata.append("coursename",data.courseTitle)
        }
        if(currentvalue.courseShortDesc!==course?.coursedescription){
            formdata.append("coursedescription",data.courseShortDesc)
            }
        if(currentvalue.courseBenefits!==course?.whatYouWillLearn){
            formdata.append("whatYouWillLearn",data.courseBenefits)
        }  
        if(currentvalue.coursePrice!==course?.price){
            formdata.append("price",data.coursePrice)
        }  
        if(currentvalue.courseCategory!==course?.category[0]?.name){
            formdata.append("category",data.courseCategory)
        } 
        if(currentvalue.courseTags.toString()!==course?.tag.toString()){
            formdata.append("tag",JSON.stringify(data.courseTags));
        }  
        if(currentvalue.courseImage!==course?.thumbnail){
            formdata.append("thumbnail",data.courseImage);
        }  
        if(currentvalue.courseRequirements.toString()!==course?.instructions.toString()){
            formdata.append("instructions",JSON.stringify(data.courseRequirements));
        } 
        setloading(true);
     const result= await editCourseDetails(formdata,token);
     setloading(false);
     if(result){
        dispatch(setStep(2));
        dispatch(setCourse(result));
        }
    }
        else{
            toast.error("no changes made to the form");
         }
         return; 
        }
   
        //create a new course
        const formdata= new FormData();
        formdata.append("coursename",data.courseTitle)
        formdata.append("coursedescription",data.courseShortDesc)
        formdata.append("whatYouWillLearn",data.courseBenefits)
        formdata.append("price",data.coursePrice)
        formdata.append("category",data.courseCategory)
        formdata.append("tag",JSON.stringify(data.courseTags))
        formdata.append("thumbnail",data.courseImage)
        formdata.append("instructions",JSON.stringify(data.courseRequirements))

        setloading(true);
        const result= await addCourseDetails(formdata,token);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        } 
        setloading(false);
     }

  return (<>
 {
    loading?(<div><Spinner/></div>):(<div>
          <form 
   onSubmit={handleSubmit(onSubmit)}
   className='bg-richblack-800 rounded-md  border-richblack-700 p-6  space-y-8 text-richblack-5'>
    <div className=' flex flex-col gap-2'>
      <label>Course Title<sup>*</sup></label>
      <input
      id="courseTitle"
      placeholder='Enter Course Title'
      {...register("courseTitle",{required:true})
       }
       className='w-[100%] bg-richblack-700 p-3 rounded-md border-richblack-300 border-b text-richblack-5 '
      />
      {
        errors.courseTitle&&(
            <span>Course title is required</span>
        )
      }
     </div>
     <div className=' flex flex-col gap-2'>
        <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
        <textarea 
        id='courseShortDesc'
        className='w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b'
        placeholder='Enter Description'
        {...register("courseShortDesc",{required:true})
        
       }
        />
        {
            errors.courseShortDesc &&(
                <span>Course Description is required</span>
            )
        }
     </div>
     <div className=' flex flex-col gap-2'>
      <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
      <input
      id="coursePrice"
      placeholder='Enter Course Price'
      {...register("coursePrice",{required:true})
       }
       className='w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b'
      />
      <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
      {
        errors.coursePrice&&(
            <span>Course Price is required</span>
        )
      }
     </div>
     <div className=' flex flex-col gap-2'>
        <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
        <select
        id='courseCategory'
        defaultValue=''
        className='w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b'
        {...register("courseCategory",{required:true})
       }
       >
       <option value="" disabled> Choose a Category</option> 
       {
        !loading&&courseCategories.map((category,index)=>(
            <option
            key={index}
            value={category.id}>
             {
                category?.name
             }
            </option>
        ))
       }
       </select>
        {
            errors.courseCategories &&(
                <span> Course Category is required**</span>
            )
        }
     </div>
       <Chipinput
      label="tags"
      name="courseTags"
      placeholder="Enter Tags And Press Enter"
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}/>

      <UploadImage
       label="CourseThumbnail"
       name="courseImage"
       placeholder="Enter Tags And Press Enter"
       register={register}
       errors={errors}
       setValue={setValue}/>

       <div className=' flex flex-col gap-2'>
        <label htmlFor='courseBenefits'>Benefits of the Course<sup>*</sup></label>
        <textarea 
        id="courseBenefits"
        placeholder='Enter Benefits of the Course'
        {...register("courseBenefits",{required:true})}
        className='w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b'
        />
        {
            errors.courseBenefits&&(
                <span>Benefits of course are required</span>
            )
        }
       </div>
       <Requirements
        name="courseRequirements"
        label="Requirements/Instructions"
        placeholder="Enter Requirements of the course"
        register={register}
        errors={errors}
        setValue={setValue}/>

        {
           editcourse&&(
            <buttton
                onClick={()=>dispatch(setStep(2))}
                className='flex items-center gap-x-2 bg-richblack-300'
            >Continue Without Saving</buttton>
           )
        }
        <Iconbtn 
        text={editcourse?"Next" : "Save Changes"}/>
       
   </form>
   <DevTool control={control}/>
    </div>)
 }
   </>
  ) 
}

export default CourseInfoForm;
