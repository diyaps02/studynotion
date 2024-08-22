import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from "../../../common/Spinner";
import { setCourse, setEditcourse } from '../../../../slices/courseslice';
import Rendersteps from '../AddCourses/Rendersteps';
import { getfullcoursedetails } from '../../../../services/operations/courseDetailsAPI';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const { courseId } = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async () => {
          setLoading(true);
          const result = await getfullcoursedetails(courseId,token);
          console.log("result",result);
          if (result) {
            dispatch(setEditcourse(true))
            dispatch(setCourse(result.coursedetails));
          } 
          setLoading(false);
        };
        populateCourseDetails()
      }, []);
    
      if (loading) {
        return <div><Spinner/></div>;
      }

   return (
    <div className="text-white w-full">
    <h1 className="text-4xl font-inter font-bold pt-10 pb-5 px-5">Edit Course</h1>
    <div className="w-[80%] ml-20">{course ? <Rendersteps /> : <p className="text-4xl w-full h-96 font-inter font-bold flex justify-center items-center">Course Not Found.</p>}</div>
  </div>
  )
}

export default EditCourse
