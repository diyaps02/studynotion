const Courses = require("../models/courses");
const Courseprogress = require("../models/courseprogress");
const Category = require("../models/category");
const User = require("../models/user");
const Section = require("../models/sectionstorage");
const Subsection = require("../models/subsection");
const Chatroom = require("../models/chatroom");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const subsection = require("../models/subsection");

//createcourse handler function
exports.createcourse = async (req, res) => {
  try {
    let {
      coursename,
      coursedescription,
      whatYouWillLearn,
      price,
      category,
      tag : _tag,
      instructions : _instructions ,
      status,
    } = req.body;
console.log("0");
    const thumbnail = req.files.thumbnail;

    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)
console.log("a");
    if (
      !coursedescription ||
      !coursename ||
      !whatYouWillLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields are not provided to create course",
      });
    }
    console.log("b");
    if ( status == undefined) {
      status = "Draft";
    }
    const instructor_id = req.user.id;
   
    console.log("c");
    const instructordetails = await User.findById(instructor_id);
    if (!instructordetails) {
      return res.status(400).json({
        success: false,
        message: "instructor details not found",
      });
    }
    const categorydetails = await Category.findOne({ name: category });
    if (!categorydetails) {
      return res.status(400).json({
        success: false,
        message: "category details not found",
      });
    }
    console.log("2");
    const uploadimage = await uploadImageToCloudinary(
      thumbnail,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    console.log(uploadimage);
    const newcourse = await Courses.create({
      coursename,
      coursedescription,
      whatYouWillLearn,
      price,
      instructor: instructordetails._id,
      category: categorydetails._id,
      thumbnail: uploadimage.secure_url,
      instructions,
      tag,
      status:status
    });

if(newcourse){
  try {
    const chatroom=await Chatroom.create({
      name:coursename+"-Doubt-Group",
      admin:instructordetails._id,
      
    })

  } catch (error) {
    
  }
}

    await User.findByIdAndUpdate(
      { _id: instructor_id },
      {
        $push: {
          courses: newcourse._id,
        },
      },
      {
        new: true,
      }
    );
    try {
      await Category.findByIdAndUpdate(
        { _id: categorydetails._id },
        {
          $push: {
            courses: newcourse._id,
          },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      console.log("error");
    }
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newcourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating course",
      error:error.message
    });
  }
};
//editcourse
exports.editcourse = async (req, res) => {
  try {
    const updates = req.body;
    console.log(updates);
    const courseId = updates.courseId;
    //check if course validation is required or not
    const course = await Courses.findById(courseId);
    if (req.files) {
      let thumbnail = req.files.thumbnail;
      const updatedThumbnail = await uploadImageToCloudinary(
        thumbnail,
        process.env.CLOUDINARY_FOLDER_NAME
      );
      course.thumbnail = updatedThumbnail.secure_url;
    }
    console.log("1");
    for (const key in updates) {
      console.log("key", key);
      if (updates.hasOwnProperty(key)) {
        course[key] = updates[key];
      }
    }
    console.log("2");
    await course.save();
    //check usage of commented code
    const updatedcourse = await Courses.findById({ _id: course._id })
      .populate({
        path: "instructor",
        populates: {
          path: "additionaldetails",
        },
      })
      .populate({
        path: "courseContent",
        populates: {
          path: "subsection",
        },
      })
      .populate("tag")
      .populate("ratingreviews")
      .exec();
    console.log("3");
    res.status(200).json({
      success: true,
      data: updatedcourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not update the course ,please retry",
      error: error.message,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const allcourses = await Courses.find(
      {},
      {
        coursename: true,
        price: true,
        thumbnail: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    );
    //   .populate("instructor")
    //   .exec();

    return res.status(200).json({
      success: true,
      message: "allcourses details fetched successfully",
      data: allcourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not get all courses",
      error: error.message,
    });
  }
};
exports.getcoursedetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const coursedetails = await Courses.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionaldetails",
        },
      })
      .populate({
        path: "category",
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .populate({
        path: "tag",
      })
      .populate({
        path: "ratingreviews",
      })
      .exec();

    let totalDuration = 0;
    coursedetails.courseContent.forEach((section) => {
      section.subsection.forEach((subsection) => {
        const timeDurationInSeconds = parseInt(subsection.timeduration);
        totalDuration += timeDurationInSeconds;
      });
    });
    if (!coursedetails) {
      return res.status(400).json({
        success: false,
        message: "could not find the course",
      });
    }
    res.status(200).json({
      success: true,
      message: "course details successfully fetched",
      data: { coursedetails, totalDuration },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while fetching course details",
    });
  }
};
exports.getfullcoursedetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const userId = req.user.id;
    const coursedetails = await Courses.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionaldetails",
        },
      })
      .populate({
        path: "category",
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .populate({
        path: "tag",
      })
      // .populate({
      //   path: "ratingreviews" error in populating ratings check!
      // })
      .exec();

    let courseProgressCount = await Courseprogress.findOne({
      courseId: courseId,
      userId: userId,
    });
    console.log("courseProgressCount", courseProgressCount);
    let totalDuration = 0;
    coursedetails.courseContent.forEach((section) => {
      section.subsection.forEach((subsection) => {
        const timeDurationInSeconds = parseInt(subsection.timeduration);
        totalDuration += timeDurationInSeconds;
      });
    });
    if (!coursedetails) {
      return res.status(400).json({
        success: false,
        message: "could not find the course",
      });
    }

    res.status(200).json({
      success: true,
      message: "course details successfully fetched",
      data: {
        coursedetails,
        totalDuration,
        completedVideos: courseProgressCount?.completed_videos
          ? courseProgressCount?.completed_videos
          : [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while fetching course details",
      error: error.message,
    });
  }
};
//getfullcoursedetails
exports.instructorCourseDetails = async (req, res) => {
  try {
    const { instId } = req.body;
    const instructor = await User.findById(instId);
    if (!instructor || !instructor.accounttype.includes("instructor")) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to view this data.",
      });
    }

    let courses = await Courses.find({ instructor: instId })
      .sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      });

    // Convert Mongoose documents to plain JavaScript objects
    courses = courses.map((course) => course.toObject());

    // Calculate total duration and add it to each course
    courses.forEach((course) => {
      let totalDuration = 0;
      course.courseContent.forEach((section) => {
        if (Array.isArray(section.subsection)) {
          section.subsection.forEach((subsection) => {
            totalDuration += parseInt(subsection.timeduration);
          });
        } else {
          console.error("Expected section.subsection to be an array, but got:", section.subsection);
        }
      });
      course.totalduration = totalDuration;
    });

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Courses found by this Instructor",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Instructor Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong fetching instructor course details",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const Course = await Courses.findById(courseId);
    if (!Course) {
      return res.status(400).json({
        success: false,
        message: "No such course exists!",
      });
    }
    try {
      const studentsEnrolled = Courses.studentsEnrolled;

      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(
          studentId,
          {
            $pull: { courses: courseId },
          },
          { new: true }
        );
      }
    } catch (error) {
      console.log("no students enrolled");
    }
    const instructorId = Course.instructor;
    const deleteinstructorcourse = await User.findByIdAndUpdate(
      instructorId,
      { $pull: { courses: { $eq: courseId } } },
      { new: true }
    );

    try {
      const sections = Course.courseContent;
      for (const sectionId of sections) {
        let recsection = await Section.findById(sectionId);

        let subsections = recsection.subsection;
        for (const subsectionid of subsections) {
          await Subsection.findByIdAndDelete(subsectionid);
        }
        await Section.findByIdAndDelete(sectionId);
      }
    } catch (error) {
      console.log("no sections or videos till now");
    }
    //delete course from ratings
    await Courses.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "The course has been deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while deleting the course",
      error: error.message,
    });
  }
};
