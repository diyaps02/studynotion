import React from 'react'
import {FooterLink2} from '../../Data/footer-links';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import Logo from "../../assets/Logo-Full-Light.png";
import { Link } from 'react-router-dom';

const Footer = () => {
 const Company=["About","Careers","Affiliates"];   
 const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
  return (
    <div className='border-t border-richblack-700 bg-richblack-800 w-100 text-richblack-100 flex flex-col'>
      <div className='flex mt-16 ml-12  border-b pb-12 border-richblack-700'>
        <div className='flex gap-16 ml-16'>
         <div className='flex flex-col gap-3'>
            <img src={Logo} alt='Studynotion'/>
            <p className='font-bold'>Company</p>
            
            {
                Company.map((element,indx)=>{
                    return <p key={indx} className='text-sm text-richblack-300'>{element}</p>
                })
            }
            <div className='flex gap-4 text-xl text-richblack-300'><FaFacebook/><FaGoogle/><FaTwitter/><FaYoutube/></div>

         </div>
         <div className='flex flex-col gap-10'>
       <div className='flex flex-col gap-3'>
       <p className='font-bold'>Resources</p>
            
            {
                Resources.map((element,indx)=>{
                    return <p key={indx} className='text-sm text-richblack-300'>{element}</p>
                })
            }
       </div>
            <div className='flex flex-col gap-3'>
            <p className='font-bold'>Support</p>
            <p className='text-sm text-richblack-300'>Help center</p>
            </div>
         </div>
         <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-3'>
            <p className='font-bold'>Plans</p>
            
            {
                Plans.map((element,indx)=>{
                    return <p key={indx} className='text-sm text-richblack-300'>{element}</p>
                })
            }
            </div>
            <div className='flex flex-col gap-3'>
            <p className='font-bold'>Community</p>
            
            {
                Community.map((element,indx)=>{
                    return <p key={indx} className='text-sm text-richblack-300'>{element}</p>
                })
            }
            </div>
         </div>
        </div>
         <div className='flex justify-between gap-28 border-l border-richblack-700 ml-20 pl-12'>
         {
            FooterLink2.map((source,indx)=>{
             return(
                <div key={indx} className='flex flex-col gap-3'>
                    <p className='font-bold text-lg'>{source.title}</p>
                    {
                        source.links.map((ele,indx)=>{
                            return (
                                <Link key={indx} to={ele.link}><p className='text-sm text-richblack-300'>{ele.title}</p></Link>
                            )
                        })
                    }
                </div>
             )
            })
         }
         </div>
      </div>
      <div className='flex p-12  items-center justify-between'>
        <div className='flex gap-3  p-2 text-richblack-300'>
            {
             BottomFooter.map((elem,indx)=>{
                return(
                    <div key={indx} className={`${elem==="Privacy-Policy"?"border-none":"border-l border-richblack-700"} pl-4 text-sm`}>{elem}</div>
                )
             })
            }
        </div>
        <div className='flex gap-1'>Made With <IoHeartSharp className=' text-pink-200 text-xl'/> © 2024 Studynotion</div>
      </div>
    </div>
  )
}

export default Footer;
