import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton,Player } from 'video-react'
import 'video-react/dist/video-react.css';
import { CgPlayButtonO } from "react-icons/cg";
import {updateCompletedLectures} from "../../../slices/viewCourseslice"
import { markLectureComplete } from '../../../services/operations/courseDetailsAPI';
import Iconbtn from "../../common/Iconbtn";

const VideoDetails = () => {

const {sectionId,subsectionId,courseId}= useParams();
const navigate=useNavigate();
const location=useLocation();
const playerRef=useRef(null);
const dispatch=useDispatch();
const {token}= useSelector((state)=>state.auth);
const {courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);

const [videoData,setVideoData]=useState([]);
const [videoEnded,setVideoEnded]= useState(false);
const [loading,setLoading]=useState(false);


useEffect(()=>{
    const setVedioSpecificDetails=async()=>{
         if(!courseSectionData.length){
            return;
         }
        if(!courseId&&!sectionId&&!subsectionId){
            navigate("/dashboard/enrolled-courses");
        }
        else{
            const filterData=courseSectionData?.filter(
                (section)=>section._id===sectionId
            );
            const filtervideoData= filterData?.[0]?.subsection?.filter((video)=>video._id===subsectionId);
            if(filtervideoData){
            setVideoData(filtervideoData[0]);
            }
            setVideoEnded(false);
        }
    }
setVedioSpecificDetails();
},[courseSectionData,courseEntireData,completedLectures,location.pathname])

const isFirstVideo=()=>{
const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);
const currentsubSectionIndex=courseSectionData[currentSectionIndex]?.subsection.findIndex((data)=>data._id===subsectionId);
if(currentSectionIndex==0&&currentsubSectionIndex==0){  
    return true;
}
else{
    return false;
}
}


const isLastVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);
    const noOfSubsection=courseSectionData[currentSectionIndex].subsection.length;

    const currentsubSectionIndex=courseSectionData[currentSectionIndex]?.subsection.findIndex((data)=>data._id===subsectionId);
    
    if(currentsubSectionIndex===noOfSubsection-1&&currentSectionIndex===courseSectionData.length-1){
     return true;
    }
else{
    return false;
}
}


const goToNextVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);
    const noOfSubsection=courseSectionData[currentSectionIndex].subsection.length;

    const currentsubSectionIndex=courseSectionData[currentSectionIndex]?.subsection.findIndex((data)=>data._id===subsectionId);

    if(currentsubSectionIndex!==noOfSubsection-1){
        const nextSubsectionId=courseSectionData[currentSectionIndex].subsection[currentSectionIndex+1]._id;
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`);
    }
    else{
        const nextsectionId=courseSectionData[currentSectionIndex+1]._id;
        const nextSubsectionId=courseSectionData[currentSectionIndex+1].subsection[0]._id;
        navigate(`/view-course/${courseId}/section/${nextsectionId}/sub-section/${nextSubsectionId}`)
    }
}

const goToPrevVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);
    const noOfPrevSubsection=courseSectionData[currentSectionIndex-1].subsection.length;

    const currentsubSectionIndex=courseSectionData[currentSectionIndex]?.subsection.findIndex((data)=>data._id===subsectionId);

    if(currentsubSectionIndex!==0){
        const prevSubsectionId=courseSectionData[currentSectionIndex].subsection[currentSectionIndex-1]._id;
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`);
    }
    else{
        const prevsectionId=courseSectionData[currentSectionIndex-1]._id;
        const prevSubsectionId=courseSectionData[currentSectionIndex-1].subsection[noOfPrevSubsection-1]._id;
        navigate(`/view-course/${courseId}/section/${prevsectionId}/sub-section/${prevSubsectionId}`)
    }
}


const handleLectureCompletion=async()=>{
///dummy code will replace it later
setLoading(true);

const res = await markLectureComplete({courseId:courseId,subsectionId:subsectionId},token);
//state updated
if(res){
    console.log(res);
    dispatch(updateCompletedLectures(subsectionId));

}

setLoading(false);
}
  return (
    <div className="flex flex-col gap-5 text-white mt-6 ml-4">
    
      {
        !videoData?(<div>
            No Data Found
        </div>):(
          <div className='w-[90%] h-[700px]'>
              <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={()=>setVideoEnded(true)}
            src={videoData?.videourl}
            >
                 <BigPlayButton position="center" />

                {
                    videoEnded&&(
                        <div
                        style={{
                            backgroundImage:
                              "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                          }}
                          className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                        >
                            {
                                !completedLectures.includes(subsectionId)&&(
                                    <Iconbtn
                                    text={!loading?"Mark as Completed":"Loading..."}
                                    disabled={loading}
                                    onclick={handleLectureCompletion}
                                    customclasses="text-xl max-w-max px-4 mx-auto font-bold rounded-md p-2 bg-blue-200 mb-3"
                                    />
                                )
                            }
                            <Iconbtn
                                    text={!loading?"Rewatch":"Loading..."}
                                    disabled={loading}
                                    onclick={()=>{
                                        if(playerRef?.current){
                                          playerRef?.current.seek(0);
                                          setVideoEnded(false);   
                                        }
                                    }}
                                    customclasses="text-xl max-w-max  font-bold px-4 mx-auto mt-2 p-2 bg-richblack-300 rounded-md"
                                    />

                            <div>
                        {
                            !isFirstVideo&&(
                                <button
                                disabled={loading}
                                onclick={goToPrevVideo}
                                className='blackButton'
                                >
                                    Prev Video
                                </button>
                            )
                        }    

                        {
                            !isLastVideo&&(
                                <button
                                disabled={loading}
                                onclick={goToNextVideo}
                                className='blackButton'
                                >
                                    Next Video
                                </button>
                            )
                        }    
                            </div>        
                        </div>
                    )
                }
            </Player>
          </div>
        )
      }
    <h1 className="mt-1 text-3xl font-semibold">
        {
            videoData?.title
        }
    </h1>
    <p className="pt-2 pb-6">
        {
            videoData?.description
        }
    </p>
    </div>
  )
}

export default VideoDetails
