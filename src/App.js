import { Routes,Route} from 'react-router-dom';
import './App.css';
import {useSelector} from 'react-redux';
import Home from './pages/Home';
import Loginpage from './pages/Logininpage';
import Signinpage from './pages/Signinpage';
import Navbar from './components/common/Navbar';
import Forgotpassword from './pages/Forgotpassword';
import Updatepassword from './pages/Updatepassword';
import Verifyemail from './pages/Verifyemail';
import Aboutpage from './pages/Aboutpage';
import Contactuspage from './pages/Contactuspage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/auth/PrivateRoute';
import Myprofile from './components/core/dashboard/Myprofile';
import Instructor from './components/core/dashboard/InstructorDashboard/Instructor'
import Error from './pages/Error';
import {Cart} from './components/core/dashboard/Cart';
import { Setting } from './components/core/dashboard/Settings';
import {Addcourse} from './components/core/dashboard/AddCourses';
import Enrolledcourses from './components/core/dashboard/Enrolledcourses';
import { ACCOUNT_TYPE } from './utils/constants';
import Mycourses from './components/core/dashboard/Mycourses';
import EditCourse from './components/core/dashboard/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import VideoDetails from './components/core/viewcourse/VideoDetails';
import ViewCourse from './pages/ViewCourse';
import Doubt from './pages/Doubt';
function App() {
  const {user} = useSelector((state)=>state.profile);
  return (
    <div className=' w-screen min-h-screen  bg-richblack-900 flex flex-col  font-inter'>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/catalog/:catalogName' element={<Catalog/>}/>
      <Route path='courses/:courseId' element={<CourseDetails/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/signup' element={<Signinpage/>}/>
      <Route path='/reset-password' element={<Forgotpassword/>}/>
      <Route path='/update-password/:token' element={<Updatepassword/>}/>
      <Route path='/verify-email' element={<Verifyemail/>}/>
      <Route path='/about' element={<Aboutpage/>}/>
      <Route path='/contact' element={<Contactuspage/>}/>
      <Route path='/doubt/:chatId' element={<Doubt/>}/>
      <Route 
       element={
      <PrivateRoute>
        <Dashboard/>
      </PrivateRoute>}
      >
        <Route path='/dashboard/my-profile' element={<Myprofile/>}/>
        <Route path='/dashboard/settings' element={<Setting/>}/>
        {
          user?.accounttype==ACCOUNT_TYPE.STUDENT&&(
            <>
            <Route path='/dashboard/cart'  element={<Cart/>}/>
            <Route path='/dashboard/enrolled-courses' element={<Enrolledcourses/>}/>
            </>
          )
        }

        {
          user?.accounttype==ACCOUNT_TYPE.INSTRUCTOR&&(
            <>
            <Route path='/dashboard/instructor' element={<Instructor/>}/>
           <Route path='/dashboard/add-course' element={<Addcourse/>}/>
           <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/> 
           <Route path='/dashboard/my-courses' element={<Mycourses/>}/>
            </>
          )
        }
       
      </Route>
      
        <Route element={
           <PrivateRoute>
           <ViewCourse/>
         </PrivateRoute>
        }>
         

          {
            user?.accounttype==ACCOUNT_TYPE.STUDENT&&(
              <>
              <Route path='/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId' element={<VideoDetails/>}/>
               </>
            )
          }
        </Route>

      <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
