import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Iconbtn from '../../../common/Iconbtn';
import { useNavigate } from 'react-router-dom';
import {buyCourse} from '../../../../services/operations/studentFeaturesAPI';
import { resetCart } from '../../../../slices/cartslice';
const RenderTotalAmount = () => {
    const {total,cart}= useSelector((state)=>state.cart);
    const {user}= useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    

    const handlebuycourse=()=>{
     const courses=cart.map((course)=>course._id);
     buyCourse(token,courses, user._id, navigate, dispatch);
    
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <Iconbtn
      text="buy now"
      customclasses={"bg-yellow-50 text-black font-semibold rounded-md p-2 pr-20 pl-20"}
      onclick={handlebuycourse}
       />
    </div>
  )
}

export default RenderTotalAmount;
