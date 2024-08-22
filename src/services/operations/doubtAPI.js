import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { chatroomendpoints ,messageendpoints} from "../apis";
import { getNodeText } from "@testing-library/react";

const {GET_CHATROOM_DETAILS}=chatroomendpoints
const {SEND_MESSAGE_API,GET_MESSAGES_API,DELETE_MESSAGE_API}=messageendpoints;

export  async function getdoubtRoomdetails(chatname,token){
    console.log("chatname",chatname);
    let toastId=toast.loading("..Loading");
    let result=null;
    try {
        const response=await apiConnector("POST",GET_CHATROOM_DETAILS,{chatname},
            {
                Authorization: `Bearer ${token}`,
              },
        );
        if(!response){
            throw new Error(response?.data?.message);
        }
        result= response?.data?.data;
        toast.success("doubt room details fetched successfully");

    } catch (error) {
        toast.error("could not fetch chatroom details");
        console.log("GET_CHATROOM_DETAILS",error);
    }
    toast.dismiss(toastId);
    return result;
}

export  async function SendMessage(message,chatId,token){
    console.log("message",message);
    let toastId=toast.loading("..Sending Message");
    let result=null;
    try {
        const response=await apiConnector("POST",SEND_MESSAGE_API,{message,chatId},
            {
                Authorization: `Bearer ${token}`,
              },
        );
        if(!response){
            throw new Error(response?.data?.message);
        }
        result= response?.data?.data;
        toast.success("message created successfully");

    } catch (error) {
        toast.error("could not create message");
        console.log("SEND_MESSAGE_API ERROR",error);
    }
    toast.dismiss(toastId);
    return result;
}

export  async function GetMessages(chatId,token){
    let toastId=toast.loading("..Gettings Messages");
    let result=null;
    try {
        const response=await apiConnector("POST",GET_MESSAGES_API,{chatId},
            {
                Authorization: `Bearer ${token}`,
              },
        );
        if(!response){
            throw new Error(response?.data?.message);
        }
        result= response?.data?.data;
        toast.success("messages fetched successfully");

    } catch (error) {
        toast.error("could not fetch messages");
        console.log("GET_MESSAGES_API ERROR",error);
    }
    toast.dismiss(toastId);
    return result;
}

export  async function DeleteMessage(messageId,token){
    let toastId=toast.loading("..deleting Message");
    let result=null;
    try {
        const response=await apiConnector("POST",DELETE_MESSAGE_API,{messageId},
            {
                Authorization: `Bearer ${token}`,
              },
        );
        if(!response){
            throw new Error(response?.data?.message);
        }
        result= response?.data?.data;
        toast.success("message deleted successfully");

    } catch (error) {
        toast.error("could not delete message");
        console.log("DELETE_MESSAGE_API ERROR",error);
    }
    toast.dismiss(toastId);
    return result;
}