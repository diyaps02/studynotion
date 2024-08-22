import React, { useEffect } from "react";
import { useState } from "react";
const Requirements = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
}) => {
  const [requirement, setrequirement] = useState("");
  const [requirementlist, setRequirementList] = useState([]);

  const handleAddRequirements = () => {
    if (requirement) {
      setRequirementList([...requirementlist, requirement]);
      setrequirement("");
    }
  };
  const handleRemoveRequirements = (index) => {
    const updatedRequirements = [...requirementlist];
    updatedRequirements.splice(index, 1);
    setRequirementList(updatedRequirements);
  };

  useEffect(() => {
    register(name, { required: true,validate: (value) => value.length > 0});
  }, []);

  useEffect(() => {
    setValue(name, requirementlist);
  }, [requirementlist]);

  return (
    <div className=' flex flex-col gap-2'>
      <label htmlFor="courseRequirements">
        {label}
        <sup>*</sup>
      </label>
      <input
        type="text"
        id={name}
        value={requirement}
        className="w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b"
        placeholder={placeholder}
        onChange={(e) => 
          setrequirement(e.target.value)
        }
      />
      <button
        onClick={handleAddRequirements}
        className="font-semibold text-yellow-50 text-start"
      >
        Add
      </button>
      {requirementlist.length > 0 && (
        <ul className="text-white">
          {requirementlist?.map((req, index) => (
           <li className="flex items-center" key={index}>
              <span>{req}</span>
              <button
                type="button"
                onClick={()=>handleRemoveRequirements(index)}
                className="bg-pure-greys-300 text-xs"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors.name && <span>{label} is required**</span>}
    </div>
  );
};

export default Requirements;
