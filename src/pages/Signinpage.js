import React, { useState } from "react";
import Loginsignin from "../components/Extras/Loginsignin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Signupimage from "../assets/signup.webp";
import Frame from "../assets/frame (2).png";
import { IoEyeSharp } from "react-icons/io5";
import Spinner from "../components/common/Spinner";
import { setsignUpdata } from "../slices/authslice";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../utils/constants";
import { sendOtp } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";

const Signinpage = () => {
  const [currenttab, setcurrenttab] = useState(ACCOUNT_TYPE.STUDENT);
  const {loading}=useSelector((state)=>state.auth);
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const {signUpdata}=useSelector((state)=>state.auth);
  const [inputerror, setinputerror] = useState("null");
  const navigate= useNavigate();
  const dispatch= useDispatch();
  
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleonchange = (e) => {
    setformdata((prev) =>({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log("tried to submit");
   
    const signupdata={
      ...formdata,accounttype:currenttab
    }
    dispatch(setsignUpdata(signupdata));

    dispatch(sendOtp(formdata.email,navigate));
  }
  function handlecurrenttab(){
     if(currenttab===ACCOUNT_TYPE.STUDENT){
      setcurrenttab(ACCOUNT_TYPE.INSTRUCTOR);
      console.log(currenttab);
     }
     else{
      setcurrenttab(ACCOUNT_TYPE.STUDENT);
      console.log(currenttab);
     }
  }
  return (
   <div>
    {
      loading?(<div><Spinner/></div>):( <div className="w-100  text-white flex p-6">
        <div className="w-[50%] pt-16 pl-32 pr-36 ">
          <Loginsignin
            title={"Join the millions learning to code with StudyNotion for free"}
            description={"Build skills for today, tomorrow, and beyond."}
            quote={"Education to future-proof your career."}
          />
          <form className="flex flex-col mt-4 gap-3" onSubmit={handlesubmit}>
            <div className="flex bg-richblack-800 rounded-full gap-4 p-1 mt-3 mb-3 w-fit  border-b border-richblack-300 ">
              <div onClick={handlecurrenttab}
                className={`rounded-full pl-6 pr-6 p-2 ${
                  currenttab == ACCOUNT_TYPE.STUDENT
                    ? " bg-richblack-900"
                    : " bg-richblack-800"
                }`}
              >
                Student
              </div>
              <div onClick={handlecurrenttab}
                className={`rounded-full pl-6 pr-6 p-2 ${
                  currenttab == ACCOUNT_TYPE.INSTRUCTOR
                    ? " bg-richblack-900"
                    : " bg-richblack-800"
                }`}
              >
                Instructor
              </div>
            </div>
            <div className="flex gap-3 w-100">
              <div className="">
                <p>First Name</p>
                <input
                  type="text"
                  name="firstname"
                  value={formdata.firstname}
                  onChange={handleonchange}
                  className=" bg-richblack-700 rounded-md p-3 px-5 border-b border-richblack-300 "
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <p>Last Name</p>
                <input
                  type="text"
                  name="lastname"
                  value={formdata.lastname}
                  onChange={handleonchange}
                  className=" bg-richblack-700 rounded-md p-3 px-5 border-b border-richblack-300"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
  
            <div className="mt-2">
              <p>Email Address</p>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleonchange}
                className=" bg-richblack-700 rounded-md p-3 w-[87%]  border-b border-richblack-300"
                placeholder="Enter email address"
              />
            </div>
  
            <div className="flex gap-3">
              <div className="">
                <p>Password</p>
                <div className="flex items-center  bg-richblack-700 rounded-md p-3  border-b border-richblack-300  ">
                  <input
                    name="password"
                    type={showpassword ? "text" : "password"}
                    value={formdata.password}
                    onChange={handleonchange}
                    className=" bg-richblack-700"
                    placeholder="Enter Password"
                  />
                  <span onClick={() => setshowpassword((prev) => !prev)}>
                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div>
                <p>Confirm Password</p>
                <div className="flex items-center  bg-richblack-700 rounded-md p-3  border-b border-richblack-300 ">
                  <input
                    name="confirmpassword"
                    type={showconfirmpassword ? "text" : "password"}
                    value={formdata.confirmpassword}
                    onChange={handleonchange}
                    className="bg-richblack-700"
                    placeholder="Confirm Password"
                  />
                  <span onClick={() => setshowconfirmpassword((prev) => !prev)}>
                    {showconfirmpassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
  
            <button type="submit" className="w-[87%] bg-yellow-50 rounded-md p-3 mt-5">
            create account
            </button>
          </form>
        </div>
        <div className="w-[50%] relative p-28 pl-32 pt-44">
          <img src={Frame} className="" width={458} height={404} />
          <img
            src={Signupimage}
            className={`absolute bottom-36 left-28 w-[61%]`}
            width={458}
            height={404}
          />
        </div>
      </div>)
    }
   </div>
  );
};

export default Signinpage;
