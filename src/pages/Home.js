import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Highlightxt from "../components/core/homepage/Highlightxt";
import CTAbutton from "../components/core/homepage/CTAbutton";
import Banner from "../assets/banner.mp4";
import Timelinesection from "../components/core/homepage/Timelinesection";
import Codeblocks from "../components/core/homepage/codeblocks";
import Learninglanguagesection from "../components/core/homepage/Learninglanguagesection";
import Instructorsection from "../components/core/homepage/Instructorsection";
import Exploremore from "../components/core/homepage/Exploremore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider"
import { useSelector } from "react-redux";
const Home = () => {
  return (
    <div>
      {/* {section1} */}
      <div className="relative mx-auto flex flex-col w-9/12 items-center text-white  ">
        <Link to={"/signup"}>
          <div className="mx-auto mt-16  rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 scale-95 shadow-2xl ">
            <div className="flex flex-row p-3 items-center">
              <p className="mr-2">Become an Instructor</p>
              <FaLongArrowAltRight className="" />
            </div>
          </div>
        </Link>
        <div className="text-4xl font-bold text-center mt-6">
          Empower your future with
          <Highlightxt text={" Coding Skills"} />
        </div>
        <div className="text-center text-sm w-[60%] mt-4 text-richblack-200">
          With our coding courses,you can learn at your own pace,from aywhere in
          the world ,and to get access to a wealth of resources,including
          hands-on projects,quizzes and personalised feedback from instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8 ">
          <CTAbutton active={true}>Learn more</CTAbutton>
          <CTAbutton active={false}>Book a demo</CTAbutton>
        </div>
        <div className="mt-16 shadow-[0px_0px_65px_0px] shadow-blue-300  w-[100%]">
          <video loop muted autoPlay src={Banner} className="shadow-[20px_20px_0px_0px] shadow-white"></video>
        </div>
        {/* {code-section-1} */}
        <div className="w-[100%]">
          <Codeblocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <Highlightxt text={"Coding Potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              btntext: "Try If Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btntext: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codecolor={"text-yellow-25"}
          />
        </div>
        {/* {code-section-2} */}
        <div className="w-[100%]">
          <Codeblocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                <p>Start<Highlightxt text={" Coding"}/> </p>
                <Highlightxt text={"In Seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btntext: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btntext: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codecolor={"text-blue-25"}
            // bggradient={"bg-gradient-to-white from-indigo-500"}
          />
        </div>
        <Exploremore/>

      </div>
      {/* {section-2}  */}
      <div className="relative mx-auto flex flex-col bg-white w-[9/12] text-black ">
        <div className="w-[100%] h-[250px] relative homepage_bg flex pt-16 justify-center gap-8">
          <CTAbutton active={true}>
            <div className="flex gap-2 item-center">
              Explore Full Catalog
              <FaLongArrowAltRight />
            </div>
          </CTAbutton>
          <CTAbutton active={false}>Learn More</CTAbutton>
        </div>
        <div className="flex mx-auto w-[80%] mt-14 max-w-maxContent">
          <div className=" text-4xl font-bold">
            Get the skills you need for a{" "}
            <Highlightxt text={"job that is in demand"} />
          </div>
          <div className=" flex   flex-col gap-4 items-start">
            <div className="text-16px">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <CTAbutton active={true}>
              <div> Learn More</div>
            </CTAbutton>
          </div>
        </div>
        <Timelinesection />
        <Learninglanguagesection />
      </div>
      {/* {section-3} */}
      <div className="flex flex-col w-11/12 mx-auto max-w-maxContent items-center justify-between gap-8  text-white">
        <Instructorsection />
        <h1 className="text-4xl mt-40 font-bold">Review From Other Learners</h1>
        <ReviewSlider/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
