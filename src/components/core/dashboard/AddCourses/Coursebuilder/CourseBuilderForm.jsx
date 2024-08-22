import React, { useState } from "react";
import { setStep, setEditcourse,setCourse } from "../../../../../slices/courseslice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import Spinner from "../../../../common/Spinner";
import Iconbtn from "../../../../common/Iconbtn";
import NestedView from "./NestedView";
import { DevTool } from "@hookform/devtools";
import { updateSection,createSection } from "../../../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";

const CourseBuilderForm = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();
  const [editflag, setEditflag] = useState(null);  
  const {loading}=useSelector((state)=>state.auth);
  const { step, course } = useSelector((state) => state.course);
  const [Loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const onsubmit = async (data) => {
    let result;
    console.log(data);
    console.log("course",course);
     setloading(true); 
    if (editflag) {
      result = await updateSection({
        sectionname: data.sectionname,
        sectionId: editflag,
        courseId: course._id,
      },token);
    }
    else{
        result=await createSection(
            {
                sectionname: data.sectionname,
                courseId: course?._id
            },token
        )
    }
    if(result){
      setValue("sectionname", "");
        dispatch(setCourse(result));
        setEditflag(null);
      }
setloading(false);    
  };

  const handleChangedEditSectionName=(sectionId,section)=>{
    if(editflag==sectionId){
        canceledId();
    }
    else{
        setEditflag(sectionId);
        setValue("sectionname",section.sectionname);
    }
  }
  
  const canceledId = () => {
    setEditflag(false);
    setValue("sectionname", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditcourse(true));
  };
  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subsection.length === 0)
    ) {
      toast.error("Please add atleast one video in each section");
      return;
    }
    dispatch(setStep(3));
  };
  return (
  <div>
    {
      loading&&Loading?(<div><Spinner/></div>):( <div className="text-white bg-richblack-800 p-6 rounded-md border border-richblack-700 mt-24 ">
        <h1 className="text-2xl font-semibold mb-6">Course Builder</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="sectionname">Section Name</label>
            <input
              id="sectionname"
              placeholder="Add a section to build your course"
              {...register("sectionname", { required: true })}
              className='w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b'
            />
            {errors.sectionname && (
              <span className="text-red-500">Section name is required.</span>
            )}
          </div>
          <div className="mt-4 flex gap-4 mb-4">
            <Iconbtn
              text={editflag ? "Edit Create section" : "Create Section"}
              type="Submit"
              outline="true"
              customclasses={
                "text-white flex  flex-row-reverse items-center gap-1 p-2 text-yellow-50 border-yellow-50 border-2 rounded-md pl-4 pr-5"
              }
            >
              <IoIosAddCircleOutline />
            </Iconbtn>
  
            {editflag && (
              <button
                type="button"
                onClick={canceledId}
                className="text-sm text-richblack-300 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
          <DevTool control={control}/>
        </form>
        {course?.courseContent?.length > 0 && <NestedView handleChangedEditSectionName={handleChangedEditSectionName} />}
  
        <div className="flex mt-10 justify-end gap-4">
          <button
            onClick={goBack}
            className=" rounded-md bg-richblack-400 text-white p-2 pr-3 pl-3 w-[15%]"
          >
            Back
          </button>
          <button
            onClick={goNext}
            className="bg-yellow-50 rounded-md text-black p-2 pr-3 pl-3 flex gap-2 items-center"
          >
            Next
            <GrNext />
          </button>
        </div>
      </div>)
    }
  </div>
  );
};

export default CourseBuilderForm;
