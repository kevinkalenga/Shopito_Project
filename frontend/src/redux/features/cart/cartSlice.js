import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getCartQuantityById } from '../../../utils';

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
      // action.payload is the products in db
       const cartQuantity = getCartQuantityById(state.cartItems, action.payload._id)
      // find the index of the product that you want to send in the cartItems
      const productIndex = state.cartItems.findIndex((item) => item?._id === action.payload._id)

      if(productIndex >= 0) {
         // Item already exist in the cart, we are going to increase the quantity
         if(cartQuantity === action.payload.quantity) {
             state.cartItems[productIndex].cartQuantity += 0
             toast.info("Max number of product reached!!!")
         } else {
                state.cartItems[productIndex].cartQuantity += 1
              toast.success(`${action.payload.name} increased by one`, {
              position: "top-left"
            })
         }

          localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        
         
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
// the method when you want to import one thing
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer