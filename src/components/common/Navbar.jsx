import React, { useEffect, useState } from 'react';
import {ACCOUNT_TYPE} from "../../utils/constants"
import Logo from '../../assets/Logo-Full-Light.png'; 
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { Link,matchPath, useLocation } from 'react-router-dom';
import {NavbarLinks} from '../../Data/navbar-links';
import { useSelector } from 'react-redux';
import Profiledropdown from '../core/auth/Profiledropdown';
import { apiConnector } from '../../services/apiconnector';
import {categories} from "../../services/apis";

const Navbar = () => {
    const {token} =useSelector((state)=>state.auth);
    const {user} =useSelector((state)=>state.profile);
    const {totalItems} =useSelector((state)=>state.cart);
    

    const location= useLocation();
    const [sublinks,setsublinks]=useState([]);

 const fetchsublinks= async()=>{
  try {
    const result = await apiConnector("GET",categories.CATEGORIES_API);
    setsublinks(result.data.categories);

  }catch (error) {
     console.log("could not fetch category list",error);
  }
}
useEffect(()=>{
 fetchsublinks()
},[])    
const matchRoute = (route) => {
   
    return matchPath({ path: route }, location.pathname)
  }
  return (
    <div className='w-[100] h-14 flex items-center border-b-[1px] border-richblack-700 bg-richblack-800 '>
      <div className='flex items-center justify-between max-w-maxContent w-11/12 mx-auto'>
         <Link to={"/"}>
            <img src={Logo} alt="StudyNotion" className='' />
            </Link> 
         {/* navlinks    */}
         <nav>
            <ul className='flex text-richblack-5 relative'>
              {
                NavbarLinks.map((link,index)=>{
                    return(
                        <li key={index}>
                            {
                                link.title==="Catalog" ? (<div className='ml-5 flex items-center group relative'>{link.title} <RiArrowDropDownLine className='text-2xl'/> 
                                <div className=' p-3 invisible w-[300px]  absolute left-[0%] top-[320%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 transition-all duration-200 opacity-0  group-hover:visible  group-hover:opacity-100 group-hover:z-10 lg:w-[300px] '>

                                <div className=' invisible absolute bg-richblack-5 rotate-45 h-6 w-6 -top-6 rounded left-[66%] group-hover:visible z-20 transition-all translate-x-[50%] translate-y-[80%] '></div>
                                {
                                  sublinks.length?
                                  (<div>
                                    {
                                      sublinks.map((links,index)=>{
                                         return<Link key={index} to={`/catalog/${links.name.split(" ").join("-").toLowerCase()}`}> 
                                         <p className={` text-black hover:font bold hover:text-blue-300`}>{links.name}
                                         </p>
                                         </Link>
                                           })
                                    }
                                  </div>):(<div></div>)
                                }

                                </div>
                                
                                
                                </div>):
                                (<Link to={link?.path}>
                                  <p className={` ml-8 ${matchRoute(link?.path) ? " text-yellow-5":" text-richblack-5"}`}>
                                    {link.title}
                                  </p>
                                </Link> )
                            }
                        </li>
                    )
                })
              }
            </ul>
         </nav>
         {/* loginSignin-dashboard */}
         <div className='flex gap-4 items-center'>
            {
                user&&user?.accounttype!==ACCOUNT_TYPE.INSTRUCTOR&& (
                    <Link to={"/dashboard/cart"}>
                      <FaShoppingCart className='text-white text-xl pt-1' size={28}/>
                      {
                        totalItems>0 &&(<span className='text-pink-100 text-sm rounded-full absolute z-20  bg-yellow-5 top-5 ml-2 px-1'>{totalItems}</span>)
                      }

                    </Link>
                )
            }
            {
                token===null&&(
                    <Link to={"/login"}>
                    <button className='border-lg border-richblack-300 bg-richblack-900 p-2 text-richblack-300 rounded-xl'>
                    Login
                    </button>
                    </Link>
                )
            }
             {
                token===null&&(
                    <Link to={"/signup"}>
                    <button className='border-lg ml-3 border-richblack-300 bg-richblack-900 p-2 text-richblack-300 rounded-xl'>
                    Signup
                    </button>
                    </Link>
                )
            }
            {
                token!==null&&(<Profiledropdown/>)
            }
         </div>
      </div>
    </div>
  )
}

export default Navbar;
