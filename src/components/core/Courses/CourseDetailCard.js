import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import {toast } from 'react-hot-toast';
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { addToCart } from '../../../slices/cartslice';

function CourseDetailCard({course,setConfirmationmodal,handleBuyCourse}){
    const {user}=useSelector((state)=>state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleAddToCart=()=>{
        if(user&&user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are instructor , you can't buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationmodal({
            text1:"You are not logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationmodal(null),
          })    
    }

    const handleShare=()=>{
    copy(window.location.href);
    toast.success("link copied to clipboard");
    }
    
return(
    <div className='bg-richblack-600 mx-auto rounded-md p-3 max-w-[400px] max-h-[550px] '>
        <img src={course.thumbnail} alt='Thumbnail Image' className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl  '/>
        <div>
            Rs.{course.price}
        </div>
        <div className='flex flex-col gap-y-6'>
        <button
        className="bg-yellow-50 p-2 mt-10 rounded-md"
        onClick={
            user&&course?.studentsEnrolled.includes(user?._id)?()=>navigate("/dashboard/enrolled-courses"):()=>handleBuyCourse()}
      >
        {
            user&&course?.studentsEnrolled.includes(user?._id)?"Go to course":"Buy course"
        }
      </button>
      {
        !course.studentsEnrolled.includes(user?._id)&&(
            <button  className='bg-richblack-500 text-white p-2 rounded-md' onClick={handleAddToCart}>
                Add to Cart
            </button>
        )
      }
        </div>
        <p>
            30-Day-Money-Back guarentee 
        </p>
        <p>
            This Course Includes:
        </p>
        <div className='flex flex-col gap-y-3 text-caribbeangreen-300'>
            {
                course?.instructions.map((item,index)=>(
                    <p key={index} className='flex gap-2'>
                        <span>{item}</span>
                    </p>
                ))
            }
        </div>
        <div >
            <button onClick={handleShare} className='mx-auto flex items-center gap-2 p-2 text-yellow-50'>
                Share
            </button>
        </div>
    </div>
)
}
export default CourseDetailCard;
