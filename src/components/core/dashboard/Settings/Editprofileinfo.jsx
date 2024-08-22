import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Iconbtn from "../../../common/Iconbtn";
import { updateprofile } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";
const Editprofileinfo = () => {
  const { user } = useSelector((state) => state.profile);
  const {token}=useSelector((state)=>state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
 
    setValue("firstname",user?.firstname);
    setValue("lastname",user?.lastname);
    setValue("dob",user?.additionaldetails.dob);
    setValue("gender",user?.additionaldetails.gender);
    setValue("contactno",user?.additionaldetails.phone_no);
    setValue("about",user?.additionaldetails.about);
  }, []);

const onSubmit=async(data)=>{
   
  const formData=new FormData();
  if(user?.firstname!=data.firstname){
    formData.append("firstname",data.firstname);
  }
  if(user?.lastname!=data.lastname){
    formData.append("lastname",data.lastname);
  }
  if(user?.additionaldetails.dob!=data.dob){
    formData.append("dob",data.dob);
  }
  if(user?.additionaldetails.gender!=data.gender){
    formData.append("gender",data.gender);
  }
  formData.append("contactno",data.contactno);
  formData.append("about",data.about);
  
  try {
    console.log("hello");
    const res=await updateprofile(formData,token);
  } catch (error) {
    console.log(error);
  }
 
}

  return (
    <div className="bg-richblack-800 rounded-lg border-richblack-600 border-[1px] px-8 py-8  text-richblack-5">
      <h1 className="font-semibold text-xl mb-2">Profile Information</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8">
            <div className=" flex flex-col gap-2">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className=" bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
              />
               {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="  bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 "
                placeholder="Enter last name"
                {...register("lastname")}
              />
               {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="contactno">Contact Number</label>
              <input
                type="number"
                name="contactno"
                id="contactno"
                className=" bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3"
                placeholder="Enter Contact Number"
                {...register("contactno")}
              />
                {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
           <div className=" flex flex-col gap-2">
              <label htmlFor="dob">Date Of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                className=" bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3"
                placeholder="dd/mm/yyyy"
                {...register("dob")}
              />
                {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                className="  bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 "
                placeholder="gender"
                {...register("gender")}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Gender.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="about">About</label>
              <input
                type="about"
                name="about"
                id="about"
                className=" bg-richblack-700 border-b-2 border-richblack-300 rounded-md p-3 "
                placeholder="Enter Bio Details"
                {...register("about")}
              />
                {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter something about you.
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <Iconbtn
              type="submit"
              text="Save"
              customclasses={
                "bg-yellow-50 rounded-md h-fit p-2 text-black px-4"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofileinfo;
