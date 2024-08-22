import React from 'react'
import Knowprogress from "../../../assets/Know_your_progress.png";
import Comparewithothers from "../../../assets/Compare_with_others.png";
import Planyourlesson from "../../../assets/Plan_your_lessons.png";
import Highlightxt from './Highlightxt';
import CTAbutton from './CTAbutton';

const Learninglanguagesection = () => {
  return (
    <div className='flex flex-col gap-5 mt-140 w-[80%] mx-auto'>
      <div className='font-bold text-4xl items-center text-center text-black mt-36'>
        Your swizz Knife For <Highlightxt text={"Learning Any Language"}/>
      </div>
      <div className="text-center text-richblack-700 font-medium  mx-auto  text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
      <div className='flex relative items-center justify-center mt-8'>
        <img src={Knowprogress} className=' object-contain -mr-32' alt='KnowYourProgress'/>
        <img src={Comparewithothers} className='object-contain' alt='CompareWithOthers'/>
        <img src={Planyourlesson} className='object-contain -ml-32' alt='PlanYourLesson'/>
        </div>   
        <div className='flex justify-center mb-28'>
            <CTAbutton active={true} linkto={"/signup"}>
                Learn More
            </CTAbutton>
            </div>   
    </div>
  )
}

export default Learninglanguagesection;
