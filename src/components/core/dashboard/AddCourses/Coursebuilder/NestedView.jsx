import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import Confirmationmodal from "../../../../common/Conformationmodal";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { setCourse } from "../../../../../slices/courseslice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSubsection,
  deleteSection,
} from "../../../../../services/operations/courseDetailsAPI";
import Spinner from "../../../../common/Spinner";

const NestedView = ({ handleChangedEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token,loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addsubsection, setAddsubsection] = useState(null);
  const [viewsubsection, setViewsubsection] = useState(null);
  const [editsubsection, setEditsubsection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId, courseId) => {
    console.log("sectionId",sectionId,"courseId",courseId);
    try {
      const result = await deleteSection(sectionId, courseId, token);
      console.log("result",result);
    if (result) {
      dispatch(setCourse(result));
    }

    } catch (error) {
      console.log(error);
    }

    setConfirmationModal(null);
  };

  const handleDeleteSubsection = async (subsectionId, sectionId,token) => {

console.log("subsectionId",subsectionId,"sectionId",sectionId)
   try {
    const result = await deleteSubsection(subsectionId, sectionId, token);
    if (result) {
      const updatedcourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedcourse = { ...course, courseContent: updatedcourseContent };
      dispatch(setCourse(updatedcourse));
    }
   } catch (error) {
    console.log(error);
   }
    setConfirmationModal(null);
  };

  return (
   <div>
    {
      loading?(<div><Spinner/></div>):( <div>
        <div className="rounded-md bg-richblack-700 p-6 px-8">
          {course?.courseContent?.map((section) => (
            <details key={section._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b-2">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu />
                  <p>{section.sectionname}</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() =>
                      handleChangedEditSectionName(section._id, section)
                    }
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => 
                      setConfirmationModal({
                        text1: "Delete this section",
                        text2: "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSection(section._id, course._id),
                        btn2Handler: ()=>setConfirmationModal(null),
                      })
                  }
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <span>|</span>
                  <BiSolidDownArrow className="text-xl text-richblack-300" />
                </div>
              </summary>
              <div>
                {section.subsection?.map((data) => (
                  <div
                    key={data._id}
                    onClick={() => setViewsubsection(data)}
                    className="flex items-center justify-between gap-x-3 border-b-2"
                  >
                    <div className="flex items-center gap-x-3">
                      <RxDropdownMenu />
                      <p>{data.title}</p>
                    </div>
                    <div onClick={(e)=>{e.stopPropagation()}} className="flex items-center gap-x-3">
                      <button
                        onClick={() =>
                          setEditsubsection({ ...data, sectionId: section._id })
                        }
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this subsection",
                            text2:
                              " This subsection will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubsection(section._id, data._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="flex text-yellow-100 items-center p-3 font-semibold gap-1"
                  onClick={() => setAddsubsection(section._id)}
                >
                  <AiOutlinePlus className="text-2xl" /> Add Lecture
                </button>
              </div>
            </details>
          ))}
        </div>
        {addsubsection ? (
          <SubSectionModal
            modaldata={addsubsection}
            add={true}
            setmodaldata={setAddsubsection}
          />
        ) : viewsubsection ? (
          <SubSectionModal
            modaldata={viewsubsection}
            view={true}
            setmodaldata={setViewsubsection}
          />
        ) : editsubsection ? (
          <SubSectionModal
            modaldata={editsubsection}
            edit={true}
            setmodaldata={setEditsubsection}
          />
        ) : (
          <div></div>
        )}
        {confirmationModal ? (
          <Confirmationmodal modalData={confirmationModal} />
        ) : (
          <div></div>
        )}
      </div>)
    }
   </div>
  );
};

export default NestedView;
