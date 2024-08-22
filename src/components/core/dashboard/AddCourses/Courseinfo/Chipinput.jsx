import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Chipinput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [coursetag, setCoursetag] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      setTags([...tags, coursetag]);
      setCoursetag("");
    }
  };

  const deleteTagHandler = (index) => {
    let updatetags = [...tags];
    updatetags.splice(index, 1);//returns elements removed
    setTags(updatetags);
  };
  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, tags);
  }, [tags]);
  return (
    <div className=' flex flex-col gap-2'>
      <label htmlFor={name}>{label}</label>
      {tags.length > 0 && 
        <div className="flex flex-wrap gap-2 ">
          {tags.map((tag, indx) => (
            <div className="flex bg-yellow-100 p-1 items-center pl-2 pr-2 gap-2 rounded-full">
              {tag}{" "}
              <span onClick={()=>deleteTagHandler(indx)}>
                <RxCross1 />
              </span>
            </div>
          ))}
        </div>
      }
      <input
        id={name}
        type="text"
        value={coursetag}
        placeholder={placeholder}
        className="w-[100%] text-richblack-5 bg-richblack-700 p-3 rounded-md border-richblack-300 border-b"
        onChange={(e) => setCoursetag(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {errors.name && <span>Tag field is required</span>}
    </div>
  );
};

export default Chipinput;
