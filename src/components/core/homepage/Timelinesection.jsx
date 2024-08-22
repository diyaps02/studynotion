import React from 'react'
import TimeLineImage from "../../../assets/TimelineImage.png";
import Logo1 from "../../../assets/Logo1.svg";
import Logo2 from "../../../assets/Logo2.svg";
import Logo3 from "../../../assets/Logo3.svg";
import Logo4 from "../../../assets/Logo4.svg";

const Timelinesection = () => {
   const timeline=[
    {
        logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skill"
    },
    {
        logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to success"
    }];

  return (
    <div className="flex w-[85%] mx-auto h-[500px] mb-16 ml-44">
    <div className=" flex flex-col mt-16 p-13">
       {
        timeline.map((element,index)=>{
            return(
                <div key={index} className='flex gap-6 mt-12 '>
                 <div className='w-[50px] h-[50px] rounded-full items-center justify-center object:contain'><img src={element.logo} alt="logo"/></div>
                 <div><div className='font-bold text-black'>{element.heading}</div>
                    <p className='text-sm'>{element.Description}</p>
                 </div>

                </div>
            )
        })
       }
    </div>
    <div className="w-[55%] relative  bg-black mt-14 ml-40 ">
      <img src={TimeLineImage} alt="timeLineImage" className='shadow-blue-200 shadow-[0px_0px_30px_0px]  object-cover h-[444px] w-[720px]' />
      <div className='absolute bg-caribbeangreen-700 opacity-100 text-white flex uppercase py-10 gap-6  -bottom-16 left-28'>
        <div className='flex items-center gap-5 border-r-caribbeangreen-300 px-7'>
            <p className='font-extrabold  text-4xl'>10</p>
             <p className=' text-caribbeangreen-300  text-xs'>YEARS OF expirence</p>
        </div>
        <div className='flex items-center gap-2  px-7'>
        <p className='font-extrabold items-center border-l border-caribbeangreen-300 text-4xl'>250</p>
             <p className=' text-caribbeangreen-300 text-xs'>TYPES OF COURSES</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Timelinesection
