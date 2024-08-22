import { createSlice } from "@reduxjs/toolkit";
import {toast } from "react-hot-toast";
 
const initialState= {
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
    total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0,
    totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0
};

const cartslice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart(state, value) {
            const course = value.payload;
            const indx = state.cart.findIndex((item) => item._id === course._id);
            if (indx >= 0) {
              toast.error("Course Already present in the cart.");
              return;
            }
            state.cart.push(course);
            ++state.totalItems;
            state.total += parseInt(course.price);
      
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItem", JSON.stringify(state.totalItems));
            localStorage.setItem("total", JSON.stringify(state.total));
      
            toast.success("Course addded to cart.");
          },
    removeFromCart(state,value){
        const courseId=value.payload;
        const index = state.cart.findIndex((item) => item._id === courseId)
      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Course removed from cart")
        }
},
resetCart: (state) => {
  state.cart = []
  state.total = 0
  state.totalItems = 0
  // Update to localstorage
  localStorage.removeItem("cart")
  localStorage.removeItem("total")
  localStorage.removeItem("totalItems")
}
}});
export const {addToCart,removeFromCart,resetCart} = cartslice.actions;
export default cartslice.reducer;