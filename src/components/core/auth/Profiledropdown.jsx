import React, { useRef } from 'react'
import {useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../../services/operations/authAPI"
import useOnClickOutside  from "use-onclickoutside"
const Profiledropdown = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref=useRef(null);
  const [open, setOpen] = useState(false)

useOnClickOutside(ref , ()=>setOpen(false));

  return (
   <>
      <div className="flex items-center gap-x-1 relative" onClick={()=>setOpen((prev)=>!prev)}>
        <img
          src={user?.image} 
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] h-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {
        open&&(
          <div className='bg-richblack-700 rounded-md text-richblack-50 font-semibold absolute top-16 right-32 p-3 z-10 px-6 flex flex-col gap-3 hover:cursor-pointer ' 
          ref={ref}>
          <Link to={"/dashboard/my-profile"}>
          <div className='flex gap-2 items-center' onClick={()=>setOpen(false)}>
           <VscDashboard/>
           <p>Dashboard</p>
           </div>
          </Link>
           <div className='flex gap-2 items-center' onClick={()=>{
            dispatch(logout(navigate))
            setOpen(false)
           }}>
            <VscSignOut/>
            <p>Logout</p>
           </div>
          </div>
        )
      }
   </>
  )
}

export default Profiledropdown;
