import React, { useState } from 'react';
// import {Chart,registrables}from 'chart.js';
// import { Pie } from "re";

// Chart.register(...registrables);

const InstructorChart = ({courses}) => {

    const [currentChart,setCurrentChart]=useState("students");

    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color); 
        }
        return colors;
    }

//create data for chart displaying student info && income info
    const chartDataForStudents={
        labels:courses?.map((course)=>course.coursename),
        datasets:[{
            data:courses.map((course)=>course.totalStudentsEnrolled),
            backgroundColor:getRandomColors(courses.length), 
        }]
    }

    const chartDataForIncome={
        labels:courses?.map((course)=>course.coursename),
        datasets:[{
            data:courses.map((course)=>course.totalAmountGenerated),
            backgroundColor:getRandomColors(courses.length), 
        }]
    }

//create options
const options={

};


  return (
    <div  className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button onClick={()=>setCurrentChart("students")}>Student</button>
        <button onClick={()=>setCurrentChart("income")}>Income</button>
      </div>
      <div className="relative mx-auto  h-full w-full">
       {/* <Pie data={currentChart==="students"?chartDataForStudents:chartDataForIncome}/> */}
      </div>
    </div>
  )
}

export default InstructorChart;
