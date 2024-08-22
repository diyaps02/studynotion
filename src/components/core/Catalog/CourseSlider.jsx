import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Pagination,Navigation,Autoplay} from 'swiper/modules'
import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
  <>
        {
        Courses.length===0?(<p>NO COURSES FOUND</p>):(
        <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
            dynamicBullets : true,
        }}
        modules={[Autoplay,Pagination,Navigation]}
        autoplay={{
            delay:2500,
            disableOnInteraction:false
        }}
        navigation={true}
        breakpoints={{
            1024 : {slidesPerView:3}
        }}
        >
          {
            Courses.map((course,index)=>(
            <SwiperSlide key={index}><Course_Card course={course} height={"h-[250px]"}/></SwiperSlide>
          ))
          }
        </Swiper>
        )
      }
</>
  )
}

export default CourseSlider
