import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer';
import { useParams } from 'react-router-dom';
import Course_Card from '../components/core/Catalog/Course_Card';
import Spinner from '../components/common/Spinner';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import { getcatagoriespageData } from '../services/operations/pageAndComponents';
import { setloading } from '../slices/authslice';


const Catalog = () => {
    const {catalogName}= useParams();
    const [loading,setLoading]=useState(false);
    const [catalogPageData,setCatalogPageData]=useState([]);
    const [categoryId,setCategoryId]=useState("");
    const [current,setCurrent]=useState("mostpopular");

    useEffect(()=>{
     const getcategoryid=async()=>{
        const result=await fetchCourseCategories();
        const category_Id=result.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
        setCategoryId(category_Id)
     }
     getcategoryid();
    },[catalogName]);
   
useEffect(()=>{
const getcategoryDetails= async()=>{
try {
     setloading(true);
    const result = await getcatagoriespageData(categoryId);
    setCatalogPageData(result);
    setloading(false);
} catch (error) {
    console.log(error);
}  
}
if(categoryId){
getcategoryDetails();
}
},[categoryId])
console.log("catalogPageData",catalogPageData);
  return (
    <div className='text-white '>
      {
        loading?(<div><Spinner/></div>):(<div><div className='flex flex-col bg-richblack-800 gap-2 p-4 px-32 pb-10 text-richblack-300 '>
          <p >{`Home / Catalog / `}<span className='text-yellow-50'>{
              catalogPageData?.selectedcategory?.name
              }</span></p>
          <p className='text-3xl font-bold text-white'>{catalogPageData?.selectedcategory?.name}</p>
          <p>{catalogPageData?.selectedcategory?.description}</p>
        </div>
        <div className='px-32 pt-4'>
          {/* section-1 */}
          <div>
              <div className='text-3xl font-bold text-white mb-4 mt-8'>Course to get you started</div>
              <div className='flex  mb-5 gap-5 cursor-pointer'>
                  <p  onClick={()=>{setCurrent("mostpopular")}}
                   className={` pl-10 pr-10 ${current=="mostpopular"?"border-b border-yellow-50 pb-2 pr-4":"border-b border-richblack-300 pb-2 pr-4"}`}>Most Popular</p>
                  <p onClick={()=>{setCurrent("new")}}
                   className={` pl-16 pr-20 ${current=="new"?"border-b border-yellow-50 pb-2 px-4":"border-b border-richblack-300 pb-2 "}`}>New</p>
              </div>
             {
             catalogPageData.length!==0&& <CourseSlider Courses={catalogPageData?.selectedcategory?.courses}/>
             } 
          </div>
          {/* section-2 */}
          <div >
           <p className='text-3xl font-bold text-white mb-4 mt-8'>Top Course in {catalogPageData?.diffcategories?.name}</p>
           <div >
            {
           catalogPageData.length!==0&& <CourseSlider Courses={catalogPageData?.diffcategories?.courses }/>
            }
           </div>
          </div>
          {/* section-3 */}
          <div>
              <p className='text-3xl font-bold text-white mb-4 mt-8'>Frequently Bought</p>
               <div className='py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                  {
                    catalogPageData?.topselling?.map((course,index)=>(
                      <Course_Card course={course?._result} key={index} height={"400px"}/>
                    ))
                  }
                </div>
               </div>
          </div>
          </div>
          <Footer/></div>)
      }
    </div>
  )
}

export default Catalog;
