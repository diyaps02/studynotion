import React from "react";
import { apiConnector } from "../apiconnector";
import { categories, courseendpoints } from "../apis";
import { setloading } from "../../slices/authslice";
import toast from "react-hot-toast";

const { CATEGORIES_API } = categories;
const {
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  GET_ALL_COURSE_API,  
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,     
  EDIT_COURSE_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  COURSE_DETAILS_API,
  COURSE_FULL_DETAILS_API,
  CREATE_RATING_API,
  REVIEW_DETAILS_API,
  LECTURE_COMPLETE_API,
  DELETE_COURSE_API
} = courseendpoints;
export async function fetchCourseCategories() {
  try {
    setloading(true);
    const response = await apiConnector("GET", CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("categories successfully fetched");
    return response.data.categories;
  } catch (error) {
    console.log("Error while fetching Categories", error);
    toast.error("error while fetching categories");
  }
  setloading(false);
}

export async function getfullcoursedetails(courseId,token){
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("POST",COURSE_FULL_DETAILS_API,{courseId},
  {
    Authorization: `Bearer ${token}`,
  });
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  result= response.data.data;
  toast.success("course fetched successfully");


} catch (error) {
  toast.error("error while fetching course");
  console.log("COURSE_FULL_DETAILS_API ERROR",error);
}
toast.dismiss(toastId);
return result;
}


export async function getcoursedetails(courseId,token){
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("POST",COURSE_DETAILS_API,{courseId},
  {
    Authorization: `Bearer ${token}`,
  });
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  result= response?.data?.data;
  toast.success("course fetched successfully");


} catch (error) {
  toast.error("error while fetching course");
  console.log("COURSE_DETAILS_API ERROR",error);
}
toast.dismiss(toastId);
return result;
}



export async function editCourseDetails(formdata, token) {
  try {
    setloading(true);
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      formdata,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("course successfully edited");
    return response.data.data;
  } catch (error) {
    toast.error("error while editing course");
    console.log(error)
  }
  setloading(false);
}
export async function addCourseDetails(data, token) {
  try {
    setloading(true);
    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("course successfully created");
    return response.data.data;
  } catch (error) {
    toast.error("error while creating course");
    console.log("error",error);
  }
  setloading(false);
}
export async function deleteSection(sectionId,courseId,token){
try {
  setloading(true);
  const response=await apiConnector(
    "POST",
    DELETE_SECTION_API,
    {sectionId,courseId},
  {
    Authorization: `Bearer ${token}`,
  }
  );
if(!response.data.success){
  throw new Error(response.data.message);
}
toast.success("delete section successful");
return response.data.data;

} catch (error) {
  toast.error("error while deleting section");
}
setloading(false);
}
export async function updateSection(data, token) {
  try {
    setloading(true);
    const response = await apiConnector(
      "POST",
      UPDATE_SECTION_API,
      data,
      token
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("section successfully edited");
    return response.data.data;
  } catch (error) {
    toast.error("error while editing section");
  }
  setloading(false);
}
export async function createSection(data, token) {
  try {
    setloading(true);
    console.log("data",data);
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      token
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("section successfully created");
    return response.data.data;
  } catch (error) {
    toast.error("error while creating section");
    console.log("error",error);
  }
  setloading(false);
}

export async function deleteSubsection(subsectionId,sectionId,token){
  try {
    setloading(true);
    const response=await apiConnector(
      "POST",
      DELETE_SUBSECTION_API,
      {subsectionId,sectionId},
      {
        Authorization: `Bearer ${token}`,
      }
    );
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  console.log(response)
  toast.success("delete section successful");
  return response.data.data;
  
  } catch (error) {
    toast.error("error while deleting section");
  }
  setloading(false);
  }
export async function createSubsection(data,token){
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("POST",CREATE_SUBSECTION_API,data,
  {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  result= response.data.data;
  toast.success("lecture created successfully");


} catch (error) {
  toast.error("error while creating lecture");
  console.log("error while creating lecture",error);
}
toast.dismiss(toastId);
return result;
}  

export async function updateSubsection(newform,token){
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("POST",UPDATE_SUBSECTION_API,newform,
  {
    "Content-Type": "multipart/form-data", 
    Authorization: `Bearer ${token}`,
  });
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  result= response.data.data;
  toast.success("lecture updated successfully");


} catch (error) {
  toast.error("error while updating lecture");
  console.log("error while updating lecture",error);
}
toast.dismiss(toastId);
return result;
}  

export async function createRating(data,token){
  console.log("data",data);
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("POST",CREATE_RATING_API,data,
  {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  result= response.data.data;
  toast.success("course rated successfully");


} catch (error) {
  toast.error("error while rating course");
  console.log("CREATE_RATING_API ERROR",error);
}
toast.dismiss(toastId);
return result;
}
export async function markLectureComplete(data,token){
  console.log("data",data);
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("POST",LECTURE_COMPLETE_API,data,
  {
    Authorization: `Bearer ${token}`,
  });
  if(!response?.data?.success){
    throw new Error(response.data.message);
  }
  result= response;
  toast.success("marked lecture as complete");


} catch (error) {
  toast.error("marked lecture as incomplete");
  console.log("LECTURE_COMPLETE_API ERROR",error);
}
toast.dismiss(toastId);
return result;
}
export async function getallRating(){
  const toastId= toast.loading("Loading..");
  let result=null;
try {
  const response =await apiConnector("GET", REVIEW_DETAILS_API,null
  );
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  result= response.data.data;
  
} catch (error) {
  toast.error("error while fetching reviews");
  console.log(" REVIEW_DETAILS_API ERROR",error);
}
toast.dismiss(toastId);
return result;
}

export async function deleteCourse(courseId,token){
  const toastId = toast.loading("Loading..");
  try{

    const response =await apiConnector("POST", DELETE_COURSE_API,courseId, {
      Authorization: `Bearer ${token}`,
    }
    );

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    toast.success("course rated successfully");
  
  } catch (error) {
    toast.error("error while fetching reviews");
    console.log(" REVIEW_DETAILS_API ERROR",error);
  }
  toast.dismiss(toastId);
}