import toast from "react-hot-toast";
import {apiConnector} from "../apiconnector";

import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setUser } from "../../slices/profileslice";
const {DELETE_PROFILE_API,UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API}=settingsEndpoints;


export async function updateprofile(formData,token){
    let toastId=toast.loading("Loading..");
    let result=[];
    try {
      const response= await apiConnector("POST",
      UPDATE_PROFILE_API,
      formData,
      {
       Authorization:`Bearer ${token}`
    }
   );
      if(!response){
         throw new Error(response.data.message)
      }
      result=response?.data?.data;
      console.log(result);
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR",error);
            toast.error("could not update profile");
    }
   toast.dismiss(toastId); 
   return result;
 }

 export function updateprofilepic(formData,token){
  return async(dispatch)=>{
    let toastId=toast.loading("Loading..");
    try {
      console.log("abcd");
      const response= await apiConnector("PUT",
      UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
       Authorization:`Bearer ${token}`
    }
   );
      if(!response?.data?.success){
         throw new Error(response.data.message)
      }
      console.log("response",response.data);
      dispatch(setUser(response?.data?.data))
      localStorage.setItem("user",JSON.stringify(response?.data?.data))
      toast.success("user profile updated successfully");
      
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API ERROR",error);
            toast.error("could not update profile pic");
    }
   toast.dismiss(toastId); 
 }
 }

   export function deleteprofile(navigate,token){
   return async(dispatch)=>{
   let toastId=toast.loading("Loading..");
   try {

     const response= await apiConnector("DELETE",
     DELETE_PROFILE_API,
      null,
     {
      Authorization:`Bearer ${token}`
    });

     if(!response.data.success){
        throw new Error(response.data.message)
     }
     toast.success("account deleted successfully");     
     dispatch(logout(navigate));

   } catch (error) {
     console.log("DELETE_PROFILE_API ERROR",error);
           toast.error("could not delete profile");
   }
  toast.dismiss(toastId); 
}
  
 }

 export async function changepassword(formData,token){
    let toastId=toast.loading("Loading..");
    try {
      const response= await apiConnector("POST",
      CHANGE_PASSWORD_API,
      formData,
      {
       Authorization:`Bearer ${token}`
    }
   );
      if(!response.data.success){
         throw new Error(response.data.message)
      }
      toast.success("Password Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR",error);
            toast.error("could not update profile");
    }
   toast.dismiss(toastId); 
   return ;

 }