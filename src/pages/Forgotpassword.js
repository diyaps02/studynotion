import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";

const Forgotpassword = () => {
  const [ email,setemail] = useState("");
  const [ emailsent, setemailsent ]= useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch=useDispatch();

  console.log("email value:",email);
  const handlesubmit= (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setemailsent))
  }
  return (
    <div className="text-white  flex justify-center items-center">
      {loading ? (
        <div><Spinner/></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 mt-28">
          <h1  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{!emailsent ? "Reset your email" : "Check your email"}</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {emailsent
              ? `We have sent the reset email to ${email}`
              : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
          </p>
          <form onSubmit={handlesubmit}>
            {!emailsent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address:</p>
                <input
                className="text-black p-2 rounded-md"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter Your Email address"
                />
              </label>
            )}

            <button type="submit"   className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
              {!emailsent ? "Reset Your Password" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to={"/login"}>
              <p  className="flex items-center gap-x-2 text-richblack-5"><BiArrowBack/>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgotpassword;
