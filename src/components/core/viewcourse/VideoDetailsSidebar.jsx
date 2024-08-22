import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../../common/Iconbtn";
import {getdoubtRoomdetails} from "../../../services/operations/doubtAPI";
import { RiArrowDropDownLine } from "react-icons/ri";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [loading,setloading]=useState(false);
  const {token}=useSelector((state)=>state.auth);
  const [videobarActive, setVideobarActive] = useState("");
  const location=useLocation();

  const navigate = useNavigate();
  const { sectionId, subsectionId ,courseId} = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const getChatroomDetails=async(id)=>{
    try {
      const chatname=id+"-Doubt-Group";
      setloading(true);
      const result =await getdoubtRoomdetails(chatname,token);
      console.log("result",result);
     if(result){
      const chatId=result?._id;
      navigate(`/doubt/${chatId}`);
     }
     setloading(false);
  
    } catch (error) {
      console.log("ERROR",error);
    }
  }

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id == sectionId
      );
      const currentSubsectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subsection.findIndex((data) => data._id == subsectionId);
      const activeSubsectionId =
        courseSectionData?.[currentSectionIndex]?.subsection?.[
          currentSubsectionIndex
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideobarActive(activeSubsectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 text-white" >
      {/* for buttons and heading */}
      <div className="pt-8">
        {/* only for buttons */}
        <div className="flex w-full items-center justify-between pt-2 mb-4 pr-2">
          <button onClick={()=>navigate("/dashboard/enrolled-courses")}
          className="flex px-4 font-semibold  items-center justify-center rounded-md bg-richblack-100 p-2 text-richblack-700"
          >
            Back
          </button>
        <button 
        onClick={()=>setReviewModal(true)}
        className="rounded-md text-black p-2 bg-yellow-50">
          Add review
        </button>
        </div>
        {/* for headings and title */}
        <div className="mt-6">
          <p className=" text-xl font-inter font-semibold mb-2">Learn {courseEntireData?.coursename}</p>
          <p className=" text-richblack-50 mb-2">
            Completed Lectures:<span className="text-caribbeangreen-200"> {completedLectures?.length}/{totalNoOfLectures}</span>
          </p>
        </div>
      </div>
      {/* for sections and subsections */}
      <div>
        {courseSectionData?.map((section, index) => (
          <div onClick={() => setActiveStatus(section?._id)} key={index}>
            {/* section */}
             <div className={`flex flex-row justify-between bg-richblack-600 px-5 py-4 ${section?._id==activeStatus?"text-yellow-50":""}`}>
                {section?.sectionname}
                <RiArrowDropDownLine/>
            </div>
            {/* subsections */}
            <div className="flex items-center gap-3">
                    {
                        activeStatus==section?._id&&(
                            <div>
                                {
                                    section?.subsection.map((topic,index)=>(
                                        <div key={index}
                                        className={`flex gap-3 p-4 ${videobarActive==topic?._id?"bg-yellow text-yellow-50":"text-white"}`}
                                        onClick={()=>{
                                            navigate(`/dashboard/enrolled-courses/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                            setVideobarActive(topic?._id);
                                        }}
                                        >
                                            <input type="checkbox"
                                            checked={completedLectures.includes(topic?._id)}
                                            onChange={()=>{}}
                                            />
                                            <span>
                                                {topic.title}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
            </div>
          </div>
        ))}
      </div>
     <button className="rounded-md text-black p-2 bg-yellow-50 mt-4 mx-4" onClick={()=>getChatroomDetails(courseEntireData?.coursename)}>
      Ask Your Doubt
     </button>
    </div>
  );
};

export default VideoDetailsSidebar;
