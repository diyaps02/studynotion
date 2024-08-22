
const BASE_URL="http://localhost:4000/api/v1";

export const categories={
CATEGORIES_API:BASE_URL+"/course/getallcategories"
};
export const endpoints={
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-passwordtoken",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    UPDATEPASSWORD_API:BASE_URL+ "/auth/reset-password",
    SIGNUP_API:BASE_URL+"/auth/signup",
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    LOGIN_API:BASE_URL+"/auth/login",
    GET_USER_ENROLLED_COURSES_API:BASE_URL+"/profile/enrolled-courses",
    GET_INSTRUCTOR_COURSES_API:BASE_URL+"/course/instructorcoursedetails",
    GET_INSTRUCTOR_DASHBOARD_API:BASE_URL+"/profile/instructorDashboard",
}
export const courseendpoints={
    GET_ALL_COURSE_API: BASE_URL + "/course/getallcourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getcoursedetails",
    COURSE_FULL_DETAILS_API: BASE_URL + "/course/getfullcoursedetails",
    EDIT_COURSE_API: BASE_URL + "/course/editcourse",
    CREATE_COURSE_API: BASE_URL + "/course/createcourse",
    CREATE_SECTION_API: BASE_URL + "/course/createsection",
    DELETE_SECTION_API:BASE_URL + "/course/deletesection",
    DELETE_SUBSECTION_API:BASE_URL+"/course/deletevideo",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createvideo",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updatevideo",
    UPDATE_SECTION_API: BASE_URL + "/course/updatesection",
    CREATE_RATING_API:BASE_URL+"/course/createrating",
    REVIEW_DETAILS_API:BASE_URL+"/course/getallrating",
    LECTURE_COMPLETE_API:BASE_URL+"/course/updateCourseProgress",
    DELETE_COURSE_API : BASE_URL + "/course/deletecourse",
}
export const catalogData={
    CATALOGPAGE_API:BASE_URL+"/course/categorypagedetails",    
}
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturepayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifypayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  } 

export const chatroomendpoints={
    GET_CHATROOM_DETAILS:BASE_URL+"/course/getChatroomDetails",
}

export const messageendpoints={
  SEND_MESSAGE_API:BASE_URL+"/course/sendmessage",
  GET_MESSAGES_API:BASE_URL+"/course/getmessages",
  DELETE_MESSAGE_API:BASE_URL+"/course/deletemessage",
}

  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updatedisplay",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteaccount",
  }


  export const contact = {
    CONTACT_API : BASE_URL + '/contact/contactUsController'
}