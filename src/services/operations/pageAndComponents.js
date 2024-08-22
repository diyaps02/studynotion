import React from 'react'
import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

const {CATALOGPAGE_API}=catalogData;

export const getcatagoriespageData=async(categoryId)=>{
 let result=[];
 let toastId=toast.loading("Loading...");
 try {
    const response= await apiConnector("POST",CATALOGPAGE_API,{categoryId},) ;
    if(!response?.data?.success){
        throw new Error("Could not fetch catalog page details ");
    }
    result=response.data;

 } catch (error) {
    console.log("catalog page api error",error);
    toast.error(error.message);
 }
 toast.dismiss(toastId);
 return result;
}

