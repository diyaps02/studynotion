import { createSlice } from "@reduxjs/toolkit";

const initialState={ 
    signUpdata:null,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")): null,
    loading:false
}

const authslice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setsignUpdata(state,value){
         state.signUpdata=value.payload;
        },
        settoken(state,value){
         state.token=value.payload;
         
        },
        setloading(state,value){
            state.loading=value.payload;
        }
    }
});
export const {settoken,setloading,setsignUpdata} =authslice.actions;
export default authslice.reducer;