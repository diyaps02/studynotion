import React from 'react';
import CTAbutton from "./CTAbutton";
import {TypeAnimation}from "react-type-animation";
import { FaLongArrowAltRight } from "react-icons/fa";
const Codeblocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,bggradient,codecolor}) => {
  return (
    <div className={`flex ${position} my-20 w-[100%] justify-between gap-10`}>
        <div className='w-[50%] flex flex-col pr-32'>
            {heading}
            <div className='text-richblack-300 font bold text-sm  mt-4'>
                {subheading}
            </div>
        <div className='flex gap-7 mt-7'>
            <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
             <div className='flex gap-2 items-center'>
               {ctabtn1.btntext} 
               <FaLongArrowAltRight/>    
             </div>
            </CTAbutton>
            <CTAbutton>
              {ctabtn2.btntext}
            </CTAbutton>
         </div>

        </div>
        <div className={`flex w-[50%]`}>
         <div className='flex flex-col w[10%] text-richblack-300 text-center font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
         </div>
         <div className={` flex flex-col w-[90%] font-bold font-mono ${codecolor} pr-2 `}>
            <TypeAnimation 
            sequence={[codeblock,2000,""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={
               {
                whiteSpace:"pre-line",
                display:"block"
               }
            }
            />
         </div>
        </div>
      
    </div>
  )
}

export default Codeblocks;
