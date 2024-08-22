import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import Iconbtn from "../../../../common/Iconbtn"
import UploadImage from "../Courseinfo/UploadImage"
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseslice";
import {
  createSubsection,
  updateSubsection
} from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import Spinner from "../../../../common/Spinner";

const SubSectionModal = ({
  modaldata,
  setmodaldata,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modaldata.title);
      setValue("lectureDesc", modaldata.description);
      setValue("lectureVideo", modaldata.videourl);
    }
  }, []);

  const isformUpdated = () => {
    const currentValues = getValues();
    console.log("currentvalues",currentValues);
    if (
      currentValues.lectureTitle !== modaldata.title ||
      currentValues.lectureDesc !== modaldata.description ||
      currentValues.lectureVideo !== modaldata.videourl
    ) {
      return true;
    }
    return false;
  };

  const handleEditSubsection = async () => {
    const newform = new FormData();
    const currentValues = getValues();

    newform.append("sectionId", modaldata.sectionId);
    newform.append("subsectionId", modaldata._id);

    if (currentValues.lectureTitle !== modaldata.title) {
      newform.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modaldata.description) {
      newform.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modaldata.videourl) {
      newform.append("videourl", currentValues.lectureVideo);
    }
    setloading(true);
    const result = await updateSubsection(newform, token);
    if (result) {
      const updatedSubSection = course.courseContent.map((section)=>section._id === modaldata.sectionId ? result : section )
      const updatedCourse = {...course,courseContent:updatedSubSection}
      dispatch(setCourse(updatedCourse));
    }
    setmodaldata(null);
    setloading(false);
  };
  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (isformUpdated()) {
        handleEditSubsection();
      }
       else{
        toast.error("No changes made in video");
        return;
      }
      setmodaldata(null);
      return;
    }
    const newform = new FormData();
    newform.append("sectionId", modaldata);
    newform.append("title", data.lectureTitle);
    newform.append("description", data.lectureDesc);
    newform.append("videourl", data.lectureVideo);

    setloading(true);
    const result = await createSubsection(newform, token);
    if (result) {
      const updatedcourseContent=course.courseContent.map((section)=>section._id===modaldata?result:section);
      const updatedcourse= {...course,courseContent:updatedcourseContent};
      dispatch(setCourse(updatedcourse));
    }
    console.log("course=>",course);
    setmodaldata(null);
    setloading(false);
  };
  return (
   <div>
    {
      loading?(<div><Spinner/></div>):( <div className="backdrop-blur-sm inset-0  bg-opacity-10 z-10 fixed w-full flex items-center justify-center" >
        <div className=" rounded-md p-2 w-[30%]  bg-richblack-800  ">
          <div className="flex justify-between mb-3">
            <p className="text-2xl font-semibold">
              {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
            </p>
            <button onClick={() => (!loading ? setmodaldata(null) : {})}>
              <RxCross2 className="text-2xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <UploadImage
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modaldata.videourl : null}
              editData={edit ? modaldata.videourl : null}
            />
  
            <div className="flex flex-col gap-2">
              <label htmlFor="lectureTitle">Lecture Title <sup>*</sup></label>
              <input
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", { required: true })}
                className={`w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b`}
              />
              {errors.lectureTitle && <span>Lecture title is required</span>}
            </div>
  
            <div className="flex flex-col gap-2">
              <label htmlFor="lectureTitle">Lecture Description <sup>*</sup></label>
              <textarea
                id="lectureDesc"
                placeholder="Lecture Description"
                {...register("lectureDesc", { required: true })}
                className='w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b'
              />
              {errors.lectureDesc && <span>Lecture Description is required</span>}
            </div>
            {
              !view&&(
                <Iconbtn
                customclasses={"text-black bg-yellow-100 rounded-md p-2 pl-3 pr-3 mt-2 flex justify-end w-fit"}
                text={loading?"loading":edit?"Save Changes":"Save"}/>
              )
            }
          </form>
        </div>
      </div>)
    }
   </div>
  );
};
export default SubSectionModal;
