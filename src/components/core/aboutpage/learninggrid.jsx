import React from 'react'
import Highlightxt from '../homepage/Highlightxt';
import { Link } from 'react-router-dom';
import CTAbutton from '../homepage/CTAbutton';

const Learninggrid = () => {
    const griddata=[{
        order:-1,
        title:"World-Class Learning for",
        hightlight:"Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btn:"Learn more",
        btnlink:"/"
    },
        {
            order:1,
        title:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order:2,
        title:"Our Learning Methods",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:3,
        title:"Certification",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:4,
        title:"Rating Auto-grading",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:5,
        title:"Ready to Work",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring"
    }];
  return (
    <div className='grid mx-auto lg:grid-cols-4  p-20 w-11/12'>
      {
        griddata.map((card,index)=>{
            return (
                <div
                    key={index}
                    className={`${index==0&&"lg:col-span-2"} ${card.order%2===0?"bg-richblack-800":"bg-richblack-700"} ${card.order===3&&"lg:col-start-2"}`}>
                        {
                            card.order<0?(
                                <div className='p-6 bg-richblack-900 text-richblack-5'>
                                    <h1 className='text-4xl font-bold'>{card.title}</h1>
                                   <p className='text-4xl font-bold'> <Highlightxt text={card.hightlight}/></p>
                                    <p className='text-richblack-300 w-[90%]'>{card.description}</p>
                                    <div className='w-fit'>
                                    <Link to={card.btnlink}>
                                    <CTAbutton active={true}>{card.btn}</CTAbutton>
                                    </Link>
                                    </div>
                                </div>
                            ):(
                                <div className='p-12 flex flex-col gap-5 pb-20'>
                                    <h1 className='text-richblack-5 text-lg'>
                                        {card.title}
                                    </h1>
                                    <p className='text-richblack-300'>
                                        {card.description}
                                    </p>
                                </div>
                            )
                        }
                </div>
            )
        })
      }
    </div>
  )
}

export default Learninggrid;
