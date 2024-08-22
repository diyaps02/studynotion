import React from 'react'
import Instructor from '../../../assets/Instructor.png';
import { FaLongArrowAltRight } from "react-icons/fa";
import Highlightxt from './Highlightxt';
import CTAbutton from './CTAbutton';

const Instructorsection = () => {
  return (
    <div className='flex mt-20 '>
      <div className='w[50%]'>
       <img src={Instructor} alt='Instructor'className='shadow-[-20px_-20px_0px_0px] shadow-white'/>
      </div>
      <div className=' flex flex-col w-[50%] p-20 '>
        <h1 className='text-4xl  font-bold  mt-24 '>Become An</h1> 
       <p className='text-4xl font-bold'> <Highlightxt text={"instructor"}/> </p>
        <p className="font-medium text-[16px] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
        </p>
       <div className='w-fit'> 
        <CTAbutton active={true}>
            <div className='flex items-center'>
                Start Teaching Today
                <FaLongArrowAltRight/>
            </div>
        </CTAbutton></div>
      </div>
    </div>
  )
}

export default Instructorsection
