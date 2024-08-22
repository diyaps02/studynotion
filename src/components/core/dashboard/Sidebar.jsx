import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Sidebarlink  from './Sidebarlink';
import {VscSignOut} from "react-icons/vsc"
import { logout } from '../../../services/operations/authAPI';
import { sidebarLinks } from '../../../Data/dashboard-links';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../common/Spinner"
import Conformationmodal from '../../common/Conformationmodal';
import ConfirmationModal from '../../common/Conformationmodal';

const Sidebar = () => {
    const {loading:authloading} = useSelector((state)=>state.auth);
    const {user,loading:profileloading} = useSelector((state)=>state.profile);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [conformationmodal,setconfirmationmodal]=useState(null);
    if(authloading||profileloading){
return(
<div className='text-4xl'>
    <Spinner/>
</div>
)
    } 
  return (
  
      <div className='flex w-[18%] text-white flex-col border-r border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
         <div>
            {
            
                sidebarLinks.map((link)=>{
                    if(link.type&&user?.accounttype!==link.type)return null;
                    return(
                        <Sidebarlink key={link.id} link={link} iconname={link.icon}/>
                    )
                })
            }
         </div>
         <div className='mx-auto mt-4 mb-4 h-[1px] w-10/12 bg-richblack-600'></div>
         <div className='flex flex-col'>
           <Sidebarlink link={{name:"Settings",path:"dashboard/settings"}}
           iconname={"VscSettingsGear"}
           />
           <button 
           onClick={()=>setconfirmationmodal({
            text1:"Are You Sure ?",
            text2:"You Will Be Logged Out of your Account",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btn1Handler:()=>dispatch(logout(navigate)),
            btn2Handler:()=>setconfirmationmodal(null), 
           })
             }
           className='text-sm font-medium text-richblack-300'>
           <div className='flex items-center gap-x-2 ml-9 mt-2'>
            <VscSignOut className='text-lg'/>
            <span>Logout</span> 
            </div>   
           </button>
         </div>
         {
          conformationmodal &&<ConfirmationModal modalData={conformationmodal}/>
         }
      </div>
    
  )
}

export default Sidebar;
