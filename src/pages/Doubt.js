import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import socket from "../utils/socket";
import { LuSendHorizonal } from "react-icons/lu";
import { SendMessage, GetMessages,DeleteMessage } from "../services/operations/doubtAPI";
import { useSelector } from "react-redux";
import { timeFormatter } from "../utils/timeformatter";
import { RiArrowDropDownLine } from "react-icons/ri";
import Spinner from "../components/common/Spinner";
import { TbPhotoSearch } from "react-icons/tb";
import { BsEmojiLaughing } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import useOnClickOutside  from "use-onclickoutside";
import ConfirmationModal from "../components/common/Conformationmodal";


const Doubt = () => {
  const { chatId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [deletemodal,setdeletemodal]=useState(null);
  const [messages, setMessages] = useState([]);
  const [delmessagearray,setdelmessagearray]=useState([]);
  const [loading,setloading]=useState(false);
  const [visible,setVisible]=useState(false);
  const [open,setOpen]=useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const ref=useRef(null);
  
  // useOnClickOutside(ref , ()=>(setdelmessagearray([]),()=>setOpen(false)))

  const getMessage = async () => {
    try {
      setloading(true);
      const result = await GetMessages(chatId, token);
      setMessages(result);
      setloading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deletesingleMessage=async(messageId)=>{
console.log(messageId);
try {
  setloading(true);
  const result=await DeleteMessage(messageId,token);
  console.log("result",result);
  setdeletemodal(null);
  setMessages(result);
  setloading(false);

} catch (error) {
  console.log("error", error);
}
}


const emojiFunction= (obj)=>{
   const emojiMessage = inputMessage + obj;
  setInputMessage(emojiMessage);
}
  const sendmessage = async () => {
    if (inputMessage.trim() != "") {
      socket.emit("message", inputMessage);
      setInputMessage("");

      try {
        const result = await SendMessage(inputMessage, chatId, token);
        console.log("result", result);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  useEffect(() => {
    getMessage();

    socket.connect();

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="min-h-screen pb-20 bg-pure-greys-100">
     {
      loading?(<div><Spinner/></div>):(<div> <div className="mt-10 mr-10 text-xl relative ">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`${
              user?.accounttype == msg.sender?.accounttype
                ? " bg-caribbeangreen-25 ml-[1250px] px-2 mb-2 p-3  "
                : " "
            } text-black w-fit rounded-md p-2  `}
            
          >
           {
           user?.accounttype!==msg?.sender?.accounttype?(
           <div className="flex gap-2 items-center">
            <div className="rounded-full w-12 h-12  "><img src={msg?.sender?.image} className="rounded-full w-full h-full"/></div>
            <div className="flex flex-col w-fit p-1 rounded-md px-2 bg-white text-black">
              <p className="text-blue-100 text-base">{msg?.sender?.firstname} {msg?.sender?.lastname}</p>
              <p>{msg?.textmesage}{timeFormatter(msg?.createdAt)}</p>
            </div>
           </div>
           ):(
             <div onClick={()=>setdelmessagearray(msg?._id)}>
            <span className={`w-[10%]`}>{msg?.textmesage}</span>
             <span className="text-sm ml-2 align-sub">{timeFormatter(msg?.createdAt)}</span>
            {
              delmessagearray.includes(msg._id)&&(
              <div className="absolute bg-white p-1 rounded-md text-sm"
              onClick={()=>setdeletemodal({
                text1:"Do you want to delete this message?",
                text2:"All the data related to this message will be deleted",
                btn1Text:"Delete",
                btn2Text:"Cancel",
                btn1Handler:()=>deletesingleMessage(msg._id),
                btn2Handler:()=>setdeletemodal(null),
              })}>delete this message
              </div>
              )
            }
           </div>
          )
           }
          </div>
        ))}
        <div className="bg-pure-greys-300 py-2 flex items-center fixed w-full bottom-0">
        <div onClick={()=>setOpen(!open)}>
          <div ref={ref}>
        <BsEmojiLaughing size={25} className="mx-1 cursor-pointer"/>
        </div>
        </div>
          <FaPlus size={25} className="mr-1"/>
          <input
            type="text"
            id="inputMessage"
            placeholder="Enter Message here"
            value={inputMessage}
            className="text-black w-[93%] py-3 pl-8"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendmessage} className=" text-caribbeangreen-25 ml-2">
            <LuSendHorizonal size={25} />
          </button>
        </div>
        {
              open &&(
                <EmojiPicker  onEmojiClick={(obj)=>emojiFunction(obj.emoji)} />  
              )
            } 
      </div>
      {
        deletemodal&&<ConfirmationModal modalData={deletemodal}/>
      }</div>)
     }
    </div>

   
  );
};
export default Doubt;
