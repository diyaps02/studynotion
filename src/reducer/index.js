import { combineReducers } from "@reduxjs/toolkit";
import authreducer from "../slices/authslice";
import profilereducer from "../slices/profileslice";
import cartreducer from "../slices/cartslice";
import coursereducer from "../slices/courseslice";
import viewCoursereducer from "../slices/viewCourseslice";

const rootreducer= combineReducers({
    auth: authreducer,
    profile:profilereducer,
    cart:cartreducer,
    course:coursereducer,
    viewCourse:viewCoursereducer,
})
export default rootreducer;