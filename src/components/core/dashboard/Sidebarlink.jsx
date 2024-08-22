import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, matchRoute, useLocation } from 'react-router-dom';
const Sidebarlink = ({link,iconname}) => {
    const location=useLocation();
    const Icon= Icons[iconname];
    const dispatch=useDispatch();

  const matchroute=(route)=>{
    return matchPath({path:route},location.pathname);
  }    
  return (
    <div className={` relative flex text-sm font-medium ${matchroute(link.path)?" bg-yellow-800":"bg-opacity-0"}`}>
      <NavLink to={link.path} className={` relative p-3 text-sm font-medium ${matchroute(link.path)?" bg-yellow-800":"bg-opacity-0"}`}>
      <span className={`absolute left-0 top-0 h-full  w-[0.2rem] bg-yellow-50 ${matchroute(link.path)?"opacity-100":"opacity-0"}`}></span>
      <div className='flex items-center gap-x-2 ml-6'>
        <Icon className="text-lg"/>
        <span className={`${matchroute(link.path)&&"text-yellow-50"}`}>{link.name}</span>
        </div>  
      </NavLink>
    </div>
  )
}

export default Sidebarlink;
