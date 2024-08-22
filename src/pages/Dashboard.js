import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/core/dashboard/Sidebar";
import Spinner from '../components/common/Spinner';

const Dashboard = () => {
    const {loading:authloading} = useSelector((state)=>state.auth);
    const {loading:profileloading} = useSelector((state)=>state.profile);

    if(authloading||profileloading){
return(
<div className='text-4xl'>
    <Spinner/>
</div>
)
    }

  return (
    <div className='flex gap-10'>
      <Sidebar/>
      <div className='relative min-h-[calc(100vh-3.5rem)] w-[83%] '>
        <div className='min-h-[calc(100vh-3.5rem)] overflow-auto'>
          <div className='w-[100%]'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

