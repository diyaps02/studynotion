import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./Coursebuilder/CourseBuilderForm";
import CourseInfoForm from "./Courseinfo/CourseInfoForm";
import PublishCourse from "./PublishCourse";
const Rendersteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course information",
    },
    {
      id: 2,
      title: "Course builder",
    },
    {
      id: 3,
      title: " Publish",
    },
  ];
  return (
   <div className=" rounded-md">
    <div className="text-white flex pl-20 ">
      {steps.map((item,indx) => (
        <>
          <div key={indx}>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center pl-1 ${
              step === item.id
                ? "bg-yellow-900 border-yellow-50 border-2 text-yellow-50"
                : "border-richblack-700 bg-richblack-800 text-richblack-300"
            }`}
          >
            {step > item.id ? <FaCheck className="font-bold text-richblack-900" /> : <p
            >{item.id}</p>
            }
          </div>
          </div>
          {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
        </>
      ))}
    </div>
    <div className="flex gap-24 text-white pl-10 mt-2">
      {
        steps.map((item,indx)=>(
          <div key={indx}>
            <p>{item.title}</p>
            </div>
        ))
      }
    </div>
    {
      step==1&&<CourseInfoForm/>
    }
    {
      step==2&&<CourseBuilderForm/>
    }
    {
      step==3&&<PublishCourse/> 
    }
   </div>
  );
};

export default Rendersteps;
