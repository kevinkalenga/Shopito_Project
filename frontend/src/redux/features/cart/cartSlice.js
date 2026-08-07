import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    fixedCartTotalAmount: 0,
    isError: false, 
    isSuccess: false,
    isLoading: false,
    message: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // find the index of the product that you want to send in the cartItems
      const productIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

      if(productIndex >= 0) {
         // Item already exist in the cart, we are going to increase the quantity
         state.cartItems[productIndex].cartQuantity += 1
          toast.success(`${action.payload.name} increased by one`, {
          position: "top-left"
        })
         
      } else {
        // Item doesn't exist in the cart, we are going to add 
        const tempProduct = {...action.payload, cartQuantity: 1}
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left"
        })
        // Save the cart to the localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      }
    }
  }
});

export const {ADD_TO_CART} = cartSlice.actions

export default cartSlice.reducer