import React from 'react'
import { Link } from 'react-router-dom';
const CTAbutton = ({children,active,linkto}) => {
  return (
   <Link to={linkto}>
     <div className={`mt-7 px-6 py-3 rounded-md font-bold text-center text-[13px] text-white hover:scale-95 transition-all duration-200
     ${active ?"bg-yellow-50 text-black":"bg-richblack-800"}`}>
        {children}
     </div>
   </Link>
  )
}

export default CTAbutton;
