import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Iconbtn from "../../../../common/Iconbtn";
import { resetCourseState, setStep } from "../../../../../slices/courseslice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setloading] = useState("false");
  const dispatch = useDispatch();
  const navigate = useNavigate()
console.log(course)
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const gotoCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      //no updation in form
      //no need to make api call
      gotoCourses();
      return;
    }
    //if form is updated
    const formdata = new FormData();
    formdata.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formdata.append("status", courseStatus);

    setloading(true);
    const result = await editCourseDetails(formdata, token);

    if (result) {
      gotoCourses();
    }
    setloading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] borderrichblack-700 bg-richblack-800 text-richblack-5">
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">Make this course as Public</label>
          <input
            type="checkbox"
            id="public"
            {...register("public", { required: true })}
          />
          {errors.public && <span>This field is required</span>}
        </div>
        <div className="flex justify-end gap-x-3">
          <button
            disabled={loading}
            type="button"
            onClick={() => goBack}
            className="flex items-center rounded-md bg-richblack-300 p-2 pr-3 pl-3"
          >
            Back
          </button>
          <button type="submit">save changes</button>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
