import { setloading,settoken } from "../../slices/authslice";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileslice";
import { endpoints } from "../apis";
import {apiConnector} from "../apiconnector";
import { useDispatch, useSelector } from "react-redux";

const {
   GET_USER_ENROLLED_COURSES_API,
   GET_INSTRUCTOR_COURSES_API,
   GET_INSTRUCTOR_DASHBOARD_API
}= endpoints;

export async  function getUserenrolledcourses(token){

        
        setloading(true);
           let result=[]; 
        try {
           const response= await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,
        null,
        {
        Authorization:`Bearer ${token}`  
        })
        if(!response){
            throw new Error(response.data.message)
        }
        console.log(response);
        result=response.data.data
        } catch (error) {
            console.log("GET_USER_ENROLLED_COURSES_API error.......",error);
            toast.error("Could Not Find Enrolled Courses")
        }
    setloading(false);
     return result;    
}

export async function getInstructorCourseDetails(instId,token){
    let toastId=toast.loading("Loading..");
    let result=[];
    try {
      const response= await apiConnector("POST",
      GET_INSTRUCTOR_COURSES_API,instId,
      {
         Authorization:`Bearer ${token}`
      }
   )
      if(!response?.data?.success){
         throw new Error(response.data.message)
      }
      result=response.data.data;

    } catch (error) {
      console.log("GET_INSTRUCTOR_COURSES_API error.......",error);
            toast.error("Could Not Find instructor Courses");
    }
   toast.dismiss(toastId); 
   return result;
}
export async function getInstructorData(token){
   let toastId=toast.loading("Loading..");
   let result=[];
   try {
     const response= await apiConnector("GET",
     GET_INSTRUCTOR_DASHBOARD_API,
     null,
     {
      Authorization:`Bearer ${token}`
   }
  );
     if(!response){
        throw new Error(response.data.message)
     }
     result=response?.data?.data;
   } catch (error) {
     console.log("GET_INSTRUCTOR_DASHBOARD_API error.......",error);
           toast.error("Could Not Find INSTRUCTOR Courses");
   }
  toast.dismiss(toastId); 
  return result;
}
