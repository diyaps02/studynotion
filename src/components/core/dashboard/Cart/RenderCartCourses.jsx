import React from 'react'
import {useSelector,useDispatch } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LiaStarSolid } from "react-icons/lia";
import { removeFromCart } from '../../../../slices/cartslice';

const RenderCartCourses = () => {
    const {cart}=useSelector((state)=>state.cart);
    const dispatch =useDispatch();
    console.log("cart",cart);
  return (
    <div className='text-white  flex flex-1 flex-col ' >
      {
        cart?.map((course,index)=>(
            <div key={index} className=' flex mb-20 '>
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                <img src={course?.thumbnail} className='min-h-[300px] min-w-[200px] max-w-[300px] max-h-[400px] ' />
                <div className="flex flex-col space-y-1">
                    <p className="text-lg font-medium text-richblack-5">{course?.coursename}</p>
                    <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                    <div className="flex items-center gap-2">
                        <span>4.8</span>
                        <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<LiaStarSolid />}
                        fullIcon={<LiaStarSolid />}
                        />
                        <span className="text-richblack-400">{course?.ratingreviews?.length}Rating</span>
                        
                    </div>
                </div>
                </div>  
                <div className="flex flex-col  items-end space-y-2 pt-28">

                  <button onClick={()=>dispatch(removeFromCart(course._id))} className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200">
                <RiDeleteBin6Fill/>
                  <span>
                    Remove
                  </span>
                  </button>
                  <p className="mb-6 text-3xl font-medium text-yellow-100">Rs. {course.price}</p>
                  </div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
