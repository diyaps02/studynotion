import { studentEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import {apiConnector} from "../apiconnector";
import { resetCart } from "../../slices/cartslice";
import rzplogo from "../../assets/rzp_logo.png";
import { setloading } from "../../slices/profileslice";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function onloadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;
        script.onload=()=>{resolve(true)}
        // onload is used to check whether the script is loaded or not and if loaded than reslove status will set
        script.onerror=()=>{resolve(false)}
        //if the promise is resolved as true then only script will be appended else not  
        document.body.appendChild(script);
    
    })
}   

export async function buyCourse(token,courses,userdetails,navigate,dispatch){
const toastId= toast.loading("Loading...");
try {
    
//  Load the Script
    const result=await onloadScript("https://checkout.razorpay.com/v1/checkout.js");
    console.log("result",result);
    if(!result){
        toast.error("Razorpay SDK failed to load");
        return;
    }

//  initiate the order

    const orderResponse= await apiConnector("POST",COURSE_PAYMENT_API,{courses},
    {
        Authorization:`Bearer ${token}`
    })
    
    if(!orderResponse?.data?.success){
        throw new   Error(orderResponse.data.message);
    }

    console.log("orderResponse",orderResponse);

    // options
    const options= {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: `${orderResponse.data.message.amount}`,
        currency: orderResponse.data.message.currency,
        order_id: orderResponse.data.message.id,
        name: "Study Notion",
        description: "Thank you for purchasing the course",
        image: rzplogo,
        handler: function (response){
           console.log("response",response);
           sendPaymentSuccessfullEmail(response,orderResponse?.data?.message?.amount,token);
           verify_Payment({...response,courses},token,navigate,dispatch)
           
        

        },
        prefill: {
            name: `${userdetails.firstname}`,
            email: userdetails.email,
        },
      
    };
   
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function(response) {
        toast.error("oops, payment failed");
        console.log(response.error);
    })

} catch (error) {
    console.log("payment API Error",error);
    toast.error("Could not make payment");
}
toast.dismiss(toastId);
}

async function sendPaymentSuccessfullEmail(response,amount,token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR",error);
    }
} 

async function verify_Payment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifying Payment...");
    console.log("bodydata",bodyData);
    dispatch(setloading(true));
     try {
        const response= await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("payment Successful,you are added to the course");
        navigate("/dashboard/enrolled-courses"); 
        dispatch(resetCart);
     } catch (error) {
        console.log("PAYMENT VERIFY ERROR....",error);
        toast.error("Could not verify Payment");
     }
     toast.dismiss(toastId);
     dispatch(setloading(false)); 

}
