import React from 'react'
import ContactForm from '../components/contactusform/ContactForm';
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const Contactuspage = () => {
    const contactDetails = [
        {
          icon: "HiChatBubbleLeftRight",
          heading: "Chat on us",
          description: "Our friendly team is here to help.",
          extras: "info@studynotion.com",
        },
        {
          icon: "BiWorld",
          heading: "Visit us",
          description: "Come and say hello at our office HQ.",
          extras:"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        },
        {
          icon: "IoCall",
          heading: "Call us",
          description: "Mon - Fri From 8am to 5pm",
          extras: "+123 456 7869",
        },
      ]
  return (
  <div className='flex justify-center'>
     <div className='flex mt-20 gap-12 w-[80%]'>
  <div className='flex flex-col rounded-lg w-[40%] bg-richblack-800  text-richblack-300 p-8 pr-20 gap-10 h-[50%]'>
    {
        contactDetails.map((ele,index)=>{
          let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
            return(
                <div className='flex flex-col gap-1' key={index}>
                 <div className='flex items-center gap-2'>
                 <Icon size={25} />
                   <h1 className='text-richblack-5 font-semibold'>{ele.heading}</h1>
                 </div>
                 <p>{ele.description}</p>
                 <a href={`mailto:${ele.extras}`}>{ele.extras}</a>
                </div>
            )
        })
    }
  </div>
<div className='mx-auto pt-22 flex flex-col gap-4 items-center w-[60%] border-2 border-richblack-700 rounded-lg'>
      <h1 className='text-4xl font-bold text-richblack-5 pt-12 text-center px-28'>
      Got a Idea? We've got the skills. Let's team up
      </h1>
      <p className='text-richblack-300'>
      Tell us more about yourself and what you're got in mind.
      </p>
      <div className=''>
      <ContactForm/>
      </div>
    </div>
   </div>
   
  </div>
  )
}

export default Contactuspage;
