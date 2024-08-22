import { setloading, settoken } from "../../slices/authslice";
import toast from "react-hot-toast";
import { setUser }from "../../slices/profileslice"
import { endpoints } from "../apis";
import {apiConnector} from "../apiconnector";
import { useDispatch, useSelector } from "react-redux";


const {
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    UPDATEPASSWORD_API,
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API
}= endpoints;

export function signUp(accounttype,firstname,lastname,email,password,confirmpassword,navigate,otp){
return  async(dispatch)=>{
    dispatch(setloading(true));
    try {
        console.log("verify=>",accounttype,firstname,lastname,email,password,confirmpassword,otp);
        const response= await apiConnector("POST",SIGNUP_API,{
            accounttype,firstname,lastname,email,password,confirmpassword,otp
        });
        if(!response.data.success) throw new Error(response.data.message);
        dispatch(setloading(false));

        toast.success("Signup Successful");
        navigate("/login");
        
    } catch (error) {
       console.log("error while signing in",error) 
    }
}
}
export function sendOtp(email,navigate){
    return  async(dispatch)=>{
        dispatch(setloading(true));
        try {
            const response= await apiConnector("POST",SENDOTP_API,{
               email
            });
            console.log(response);
            if(!response.data.success) throw new Error(response.data.message);

            toast.success("Otp sent  Successfully");
            navigate("/verify-email");
            
        } catch (error) {
           console.log("error while sending otp",error);
           toast.error("error sending otp");
        }
        dispatch(setloading(false));
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
      dispatch(setloading(true));
      try {
        const response= await apiConnector("POST",LOGIN_API,{
            email,password
        });
        console.log(response);
        if(!response.data.success){
         throw new Error(response.data.message);
        }

        dispatch(settoken(response.data.token));
      //  dispatch(setUser({...response.data.user}))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        toast.success("user logged in successfully");
        navigate('/');

      } catch (error) {
          console.log("error while logging in",error);
           toast.error("error logging in");
      }
      dispatch(setloading(false));
    }
}
export function logout(navigate){
    return (dispatch)=>{
        dispatch(settoken(null));
        dispatch(setUser(null));
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        toast.success("logged out successfully");
        navigate("/");
    }  
}

export function getPasswordResetToken(email,setemailsent){
    return async( dispatch)=>{
       dispatch(setloading(true));
        try {
            const response =await apiConnector("POST",RESETPASSTOKEN_API,{email});
            console.log("RESET PASSWORD RESPONSE",response);
            console.log("error",response);
            if(!response.data.success){
                throw new Error(response.data.message );
                
            }
            toast.success("Reset Email Sent");
            setemailsent(true);
        } catch (error) {
            console.log("reset password token error");
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setloading(false));
    }
}
export function resetpassword( password,confirmpassword,token){
   return async(dispatch)=>{
        console.log("reached authapi");
        dispatch(setloading(true));
        try {
       const  response=await apiConnector("POST",UPDATEPASSWORD_API,{
            password,confirmnewpassword:confirmpassword,token
        });
        console.log("RESET PASSWORD RESPONSE....");
        if (!response.data.success) {
            throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfully");

    } catch (error) {
        console.log("reset paasword token error",error);
        toast.error("Unable to reset password");
    }
    dispatch(setloading(false));
   }
}