import React from 'react'
import ContactForm from '../../contactusform/ContactForm';
const Contactformsection = () => {
  return (
    <div className='mx-auto pt-22 flex flex-col gap-4 items-center'>
      <h1 className='text-4xl font-bold text-richblack-5'>
        Get in Touch
      </h1>
      <p className='text-richblack-300'>
      We'd love to here for you, Please fill out this form.
      </p>
      <ContactForm/>
    </div>
  )
}

export default Contactformsection;
