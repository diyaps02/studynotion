import React from 'react'
import Rendersteps from './Rendersteps'
export function Addcourse(){
  return (
    <div className='flex h-full w-full'>
      <div className='w-[57%]'>
        <h1>
            Add Courses
        </h1>
        <div className='w-[80%] ml-20'>
            <Rendersteps/>
        </div>
        </div>
        
        <div className=' bg-richblack-800 rounded-lg border-richblack-700 border h-fit w-96 p-6 font-inter flex justify-center items-start flex-col gap-y-6 right-32 mt-10 fixed'>
            <p className='text-white mb-7 text-lg pl-4'>Code Upload Tips</p>
            <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        
      </div>
    </div>
  )
}


