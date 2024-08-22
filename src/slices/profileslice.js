import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null,
    loading:false
}

const profileslice= createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
    setUser(state,value){
        state.user=value.payload;
    },
    setloading(state,value){
        state.loading=value.payload;
    }
    }
});
export const {setUser,setloading} = profileslice.actions;
export default profileslice.reducer;