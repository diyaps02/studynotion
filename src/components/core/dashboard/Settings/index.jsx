import React from 'react'
import Editprofile from './Editprofile'
import Editprofileinfo from './Editprofileinfo'
import Deleteaccount from './Deleteaccount'
import Changepassword from './Changepassword'

export function  Setting(){
  return (
    <div>
      <div className='w-[70%] mx-auto mt-12 flex flex-col gap-8 mb-10'>
      Edit Profile
      <Editprofile/>
      <Editprofileinfo/>
      <Changepassword/>
      <Deleteaccount/>

      </div>
    </div>
  )
};

