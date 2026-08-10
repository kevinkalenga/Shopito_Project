import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getCartQuantityById } from '../../../utils';
import cartService from './cartService';

// Apply discount to cart 
function applyDiscount(cartTotalAmount, discountPercentage) {
  var discountAmount = (discountPercentage / 100) * cartTotalAmount;
  var updatedTotal = cartTotalAmount - discountAmount;

  return updatedTotal;
}



const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    initialCartTotalAmount: 0,
    isError: false, 
    isSuccess: false,
    isLoading: false,
    message: "",
}


// Save Cart 
export const saveCartDB = createAsyncThunk(
  "cart/saveCartDB",

  async (cartData, thunkAPI ) => {
    try {
      return await cartService.saveCartDB(cartData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

// Get CartDB 
export const getCartDB = createAsyncThunk(
  "cart/getCartDB",

  async (_, thunkAPI ) => {
    try {
      return await cartService.getCartDB()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)





const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // action.payload is the products that we are sending
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
        
    },
    DECREASE_CART(state, action) {
      
      // find the index of the product that you want to send in the cartItems
      const productIndex = state.cartItems.findIndex((item) => item?._id === action.payload._id)

      if(state.cartItems[productIndex].cartQuantity > 1) {
        
             state.cartItems[productIndex].cartQuantity -= 1
              toast.success(`${action.payload.name} decrease by one`, {
              position: "top-left"
            })
         
      } else if(state.cartItems[productIndex].cartQuantity === 1){
        
        const newCartItem = state.cartItems.filter((item) => item._id !== action.payload._id)
        state.cartItems = newCartItem 

        toast.success(`${action.payload.name} removed from cart`, {
              position: "top-left"
        })
      }

      // Save the cart to the localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        
    },

    REMOVE_FROM_CART(state, action) {
        const newCartItem = state.cartItems.filter((item) => item._id !== action.payload._id)
        state.cartItems = newCartItem 

        toast.success(`${action.payload.name} removed from cart`, {
              position: "top-left"
        });

         // Save the cart to the localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
        
        state.cartItems = []

        toast.success(`Cart has been cleared successfully!`, {
              position: "top-left"
        })

         // Save the cart to the localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
        
       const array = []

       state.cartItems?.map((item) => {
        const {cartQuantity} = item 
        const quantity = cartQuantity 
        return array.push(quantity)
       })

       const totalQuantity = array.reduce((a, b) => {
            return a + b
       }, 0)

       state.cartTotalQuantity = totalQuantity
    },
    CALCULATE_SUBTOTAL(state, action) {
        const array = []

        state.cartItems?.map((item) => {
          const {price, cartQuantity} = item 
          const cartItemAmount = price * cartQuantity
          return array.push(cartItemAmount);
        });

        const totalAmount = array.reduce((a, b) => {
            return a + b;
       }, 0)

        state.initialCartTotalAmount = totalAmount;
        
        // if the information contains the coupon
        if(action.payload && action.payload.coupon !== null) {
           const discountedTotalAmount = applyDiscount(
             totalAmount,
             action.payload.coupon.discount
           )

            state.cartTotalAmount = discountedTotalAmount;
        } else {
            state.cartTotalAmount = totalAmount;
        }
       
    },
  },
  extraReducers: (builder) => {
      builder 
          // SaveCartDB
          .addCase(saveCartDB.pending, (state) => {
              state.isLoading = true; 
              state.isSuccess = false; 
              state.isError = false;
          })
          .addCase(saveCartDB.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "";
              //console.log(action.payload)
              
                     
          })
          .addCase(saveCartDB.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          // GetCartDB
          .addCase(getCartDB.pending, (state) => { 
            state.isLoading = true; 
            state.isSuccess = false; 
            state.isError = false; 
          })
          .addCase(getCartDB.fulfilled, (state, action) => { 
            state.isLoading = false; 
            state.isSuccess = true; 
            state.isError = false; 
            state.message = ""; 
            state.cartItems = action.payload;

              localStorage.setItem(
                "cartItems",
                JSON.stringify(action.payload)
            );

            // console.log(action.payload);
         })
         .addCase(getCartDB.rejected, (state, action) => { 
          state.isLoading = false; 
          state.isSuccess = false; 
          state.isError = true; 
          state.message = action.payload; 
          toast.error(action.payload); 
        });
          
  }
});

export const {
  ADD_TO_CART, 
  DECREASE_CART, 
  REMOVE_FROM_CART, 
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY, 
  CALCULATE_SUBTOTAL
} = cartSlice.actions 
// the method when you want to import one thing
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;