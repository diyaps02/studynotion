import { createSlice } from "@reduxjs/toolkit";

const initialState={
  step:1,
  course:null,
  editcourse:false,
};
const courseslice= createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setCourse(state,value){
         state.course=value.payload;
        },
        setStep(state,value){
        state.step=value.payload;
        },
        setEditcourse(state,value){
            state.editcourse=value.payload;
            },
            resetCourseState: (state) => {
              state.step = 1
              state.course = null
              state.editcourse = false
            },
    }
})
export const  {setCourse,setStep,setEditcourse , resetCourseState}= courseslice.actions;
export default courseslice.reducer; 