import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';


const Course_Card = ({course,height}) => {

    const [avgReviewCount,setAvgReviewCount]=useState(0);

    useEffect(()=>{
     const count =GetAvgRating(course?.ratingreviews);
     setAvgReviewCount(count);
    },[course]);
    console.log("course",course);
  return (
    <div className='bg-richblack-800 mx-3'>
      <Link to={`/courses/${course?._id}`}>
      <div className='flex flex-col gap-1'>
        <div className='mb-2'>
            <img src={course?.thumbnail} alt='Course thumbnail' className={`${height} w-full object-cover`}/>
        </div>
        <div className='pl-3'>
            <p className='text-xl font-bold'>{course?.coursename}</p>
            <p className='text-richblack-300'>{course?.instructor?.firstname} {course?.instructor?.lastname}</p>
        </div>
        <div className='flex gap-x-2 pl-3'>
            <span className='text-yellow-50'>
             {avgReviewCount||0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span >
            {course?.ratingreviews?.length} Ratings
            </span>

        </div>
        <p className='text-lg font-semibold pl-3 mb-3'>
            Rs.{course?.price}
        </p>
      </div>
      </Link>
    </div>
  )
}

export default Course_Card
