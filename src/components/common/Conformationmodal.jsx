import React from "react";
import Iconbtn from "./Iconbtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="backdrop-blur-sm inset-0 text-white  bg-opacity-10 z-10 fixed">
    <div className=" bg-richblack-800 mt-[20%] ml-[40%] w-80 p-5  border border-richblack-600 rounded-lg">
      <div>
        <p className="text-lg font-inter font-semibold mb-3">{modalData.text1}</p>
        <p className="mb-4 text-richblack-400.">{modalData.text2}</p>
        <div className>
          <Iconbtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="bg-yellow-50 text-black rounded-lg py-2 px-4"
          />
          <button onClick={modalData?.btn2Handler} className="text-black bg-richblack-200 ml-5 rounded-lg py-2 px-4 font-inter">
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmationModal;
