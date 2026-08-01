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


// getCoupon 

export const getCoupon = createAsyncThunk(
  "coupons/getCoupon",
  async (couponName, thunkAPI) => {
    try {
      return await couponService.getCoupon(couponName);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update coupon
export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async ({id, formData}, thunkAPI) => {
    try {
      return await couponService.updateCoupon(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



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
           // Get single Coupon
          .addCase(getCoupon.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isSuccess = false;
              state.message = "";
          })
          
          .addCase(getCoupon.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
          
              state.coupon = action.payload;
              console.log(action.payload)
          })
          .addCase(getCoupon.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
          
              toast.error(action.payload);
          })
          // Update Coupon
          .addCase(updateCoupon.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isSuccess = false;
              state.message = "";
          })
          
          .addCase(updateCoupon.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
          
              state.coupon = action.payload;
          
              // Mise à jour dans la liste
              state.coupons = state.coupons.map((coupon) =>
                  coupon._id === action.payload._id
                      ? action.payload
                      : coupon
              );
          
              // toast.success("Product updated successfully");
          })
          
          .addCase(updateCoupon.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
          
              toast.error(action.payload);
          })

  }
});

export const {} = couponSlice.actions

export default couponSlice.reducer