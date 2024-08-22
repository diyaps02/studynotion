import React from 'react'

const Loginsignin = ({title,description,quote}) => {
  return (
    <div>
      <p className='text-3xl font-bold text-white'>{title}</p>
      <p className=' text-richblack-300 mt-8'>{description}</p>
      <p  className='mt-2 font-edu-sa font-bold italic text-blue-100'>{quote}</p>

    </div>
  )
}

export default Loginsignin;
