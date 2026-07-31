import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import couponService from './couponService'

const initialState = {
    coupon: null,
    coupons: [],
    isError: false, 
    isSuccess: false,
    isLoading: false,
    message: "",
}


// Create coupon 
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",

  async (formData, thunkAPI ) => {
    try {
      return await couponService.createCoupon(formData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

// Get all coupons 
export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",

  async (_, thunkAPI ) => {
    try {
      return await couponService.getCoupons()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)



const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Create coupon
        .addCase(createCoupon.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.coupons.push(action.payload);
            toast.success("Coupon created successfully");
            //console.log(action.payload);
                     
        })
        .addCase(createCoupon.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        // Get coupons
          .addCase(getCoupons.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(getCoupons.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.coupons = action.payload;
          })
          .addCase(getCoupons.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
              toast.error(action.payload);
          })

  }
});

export const {} = couponSlice.actions

export default couponSlice.reducer