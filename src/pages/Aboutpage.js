import React from 'react'
import Highlightxt from "../components/core/homepage/Highlightxt";
import aboutus1 from "../assets/aboutus1.webp";
import foundationphoto from "../assets/FoundingStory.png";
import aboutus2 from "../assets/aboutus2.webp";
import aboutus3 from "../assets/aboutus3.webp";
import Learninggrid from '../components/core/aboutpage/learninggrid';
import Footer from '../components/common/Footer';
import Contactformsection from '../components/core/aboutpage/Contactformsection';
const Aboutpage = () => {
   const hardcode=[{
        number:"5K",
        title:"Active Students"
    },{
        number:"10+",
        title:"Mentors"
    },{
        number:"200+",
        title:"Courses"
    },{
        number:"50+",
        title:"Awards"
    }];

  return (
    <div>
      {/* section-1 */}
      <div className='flex flex-col gap-2  text-richblack-5 bg-richblack-700  p-16 justify-center items-center pb-64'>
       <h1 className='text-4xl font-bold'>Driving Innovation in Online Education for a </h1>
        <div className='text-4xl font-bold'> <Highlightxt text={"Brighter Future"}/></div>
        
       
         <p className='text-richblack-300 text-center w-[59%] text-[18px] '>
         Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
         </p>
         <div className='absolute bottom-16 gap-10 flex' >
          <img src={aboutus1}/>
          <img src={aboutus2} />
          <img src={aboutus3}/>
         </div>
      </div>

      {/* section-2 */}
       <div>
        <p className='text-4xl font-bold text-richblack-5 pt-44 p-20 text-center border-b border-richblack-700'>
        We are passionate about revolutionizing the way we learn. Our innovative platform <span><Highlightxt text={"combines technology"}/></span>,<span className=''>expertise</span>, and community to create an unparalleled educational experience.
        </p>
       </div>
       {/* section-3 */}
       <div className='flex w-full text-richblack-300'>
         <div className='flex flex-col gap-8 w-[50%] p-24'>
           <p className='text-4xl font-bold'><Highlightxt text={"Our Foundation Story"}/></p>
           <p>
           Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
           </p>
           <p>
           As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
           </p>
         </div>
         <div className='w-[50%] p-32 '>
            <img src={foundationphoto} alt="Foundation" className='shadow-[0px_0px_22px_0px]  shadow-pink-400'/>
         </div>
       </div>
       {/* section-4 */}
       <div className='flex w-full text-richblack-300'>
       <div className='flex flex-col gap-8 w-[50%] p-32 pl-40 pr-40'>
           <p className='text-4xl font-bold'><Highlightxt text={"Our Vision"}/></p>
           <p className='text-[17px]'>
           With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
           </p>
         </div>

         <div className='w-[50%]  flex flex-col gap-8 p-32 pl-40 pr-40 '>
         <p className='text-4xl font-bold'><Highlightxt text={"Our Mission"}/></p>
           <p className='text-[17px]'>
           Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
           </p>
         </div>
       </div>
       {/* section-5 */}
       <div className='flex bg-richblack-700 justify-around p-12'>
           {
            hardcode.map((ele,index)=>{
                return(
                 <div key={index}>
                  <p className='text-4xl font-bold text-richblack-5'>{ele.number}</p>
                  <p className='text-richblack-300'>{ele.title}</p>
                </div>)
            })
           }
       </div>
       {/* section-6 */}
       <Learninggrid/>
       <Contactformsection/>
       <Footer/>
    </div>
  )
}

export default Aboutpage;
