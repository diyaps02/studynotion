import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import {FaStar} from 'react-icons/fa'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import ReactStars from 'react-rating-stars-component';
import { courseendpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { useSelector } from 'react-redux'
import { getallRating } from '../../services/operations/courseDetailsAPI'
import Spinner from './Spinner'


const ReviewSlider = () => {
    const {REVIEW_DETAILS_API}=courseendpoints;
    const [loading,setLoading]=useState(false);
    const [reviews,setReviews]=useState([]);
   // const {user}=useSelector((state)=>state.profile);
    const truncatewords=15;

    useEffect(()=>{
        const fetchAllReviews=async()=>{
          setLoading(true);
          const res=await getallRating();
          setLoading(false);
          if(res){
        setReviews(res);

          }
        }
        fetchAllReviews();
    },[]);

  return (
    <div className='mb-16 w-full'>
{
  loading?(<div><Spinner/></div>):(      <div className='h-[190px] max-w-maxContent'>
    <Swiper
    className='mySwiper'
    slidesPerView={2}
    spaceBetween={24}
    loop={true}
    autoplay={
        {
            delay:2500,
                disableOnInteraction:false,

        }
    }
    breakpoints={{
      1024:{slidesPerView:3}
    }}

    >
       {
        reviews?.map((review,index)=>(
            <SwiperSlide key={index}>
                <div className='bg-richblack-800 p-4 w-fit'>
                <div className='flex items-center gap-2 mb-4'>
                <img src={review?.user?.image} alt='Profilepic' className='h-9 w-9 object-cover rounded-full' />
              <div className='flex flex-col mt-2'>
              <p className="font-semibold text-richblack-5">{review?.user?.firstname} {review?.user?.lastname}</p>
                <p className='text-richblack-500 text-md'>{review?.user?.email}</p>
                </div>
                </div>
                <p className="text-[12px] font-medium text-richblack-300 mb-2">{review?.course?.coursename}</p>
                <p className="font-medium text-richblack-25">{review?.review}</p>
              <div className='flex gap-2 items-center'>
              <p className="font-semibold text-yellow-100 mt-1">{review?.rating.toFixed(1)}</p>
                <ReactStars count={5} value={review?.rating} size={24} edit={false} activeColor="#ffd700"
                emptyIcon={<FaStar/>}
                fullIcon={<FaStar/>}
                />
              </div>
                </div>
            </SwiperSlide>
        ))
       }
    </Swiper>
  </div>)
}
    </div>
  )
}

export default ReviewSlider;
