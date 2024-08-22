import axios from 'axios'
import toast from 'react-hot-toast';
export const axiosInstance= axios.create({});

export const apiConnector=(method,url,bodydata,headers,params)=>{

    return axiosInstance({
     method:`${method}`,
     url:`${url}`,
     data:bodydata? bodydata:null,
     headers:headers?headers:null,
     params:params?params:null,
    });
}