import React, { useState } from 'react'
import Highlightxt from './Highlightxt';
import { HomePageExplore } from '../../../Data/homepage-explore';
import { BsFillPeopleFill } from "react-icons/bs";
import { ImTree } from "react-icons/im";
import Home from '../../../pages/Home';

const Exploremore = () => {
  const tags=["Free","New to coding","Most popular","Skills paths","Career paths"];
  const [currentTab,setCurrentTab]=useState(HomePageExplore[0].tag);
  const [courses,setcourses]=useState(HomePageExplore[0].courses);
  const [currentCard,setcurrentCard]=useState(HomePageExplore[0].courses[0].heading)
  
  function handleClick(tab){
    console.log(tab);
   setCurrentTab(tab);
   const result=HomePageExplore.filter(((course) => course.tag === tab));
   console.log(result);
   setcourses(result[0].courses);
   setcurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className='flex flex-col mt-32 w-[90%] mx-auto h-[450px] mb-16'>
      <div className='text-4xl mt-28 ml-60  font-bold'>Unlock the <Highlightxt text={"Power of Code"}/></div>
      <p className="ml-80 text-richblack-300 text-sm font-semibold mt-1 ">
            Learn to Build Anything You Can Imagine
      </p>
       <div className='flex flex-col gap-2'>
          <div className='flex ml-52 mt-8 gap-2'>
           {
            tags.map((element,index)=>{
              return(
                <div key={index} className={`${currentTab==element ? " p-2  rounded-lg border-inherit text-richblack-5 bg-richblack-900" :"p-2 rounded-lg text-richblack-300 bg-richblack-800 transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5"}`} onClick={()=>{handleClick(element)}}>
                  {element}
                </div>
              )
            })
           }
          </div>
          <div className='flex absolute z-10 -bottom-8 w-[80%] gap-10 justify-between mt-16'>
            {
              courses.map((course,indx)=>{
                return(
                  <div key={indx} className={`flex flex-col p-6 w-[fit] ${currentCard===course.heading ? "bg-white text-black   ":"bg-richblack-800 text-richblack-300 "}`}>
                  <div className='mt-4'>
                     <h2 className={`${currentCard===course.heading?"text-black font-bold":"text-white font-bold"}`}>{course.heading}</h2>    
                    <p className=' text-sm mt-4'>{course.description}</p>
                    </div>
                  <div className='flex justify-between border-dashed border-t pt-4 border-richblack-300 mt-10'>
                    <div className='flex items-center gap-2'><BsFillPeopleFill/>{course.level}</div>
                    <div className='flex items-center gap-2'><ImTree/>{course.lessionNumber} Lessons</div>
                  </div>
                  </div>
                )
              })
            }
          </div>
        </div>    
    </div>
  )
}

export default Exploremore;
