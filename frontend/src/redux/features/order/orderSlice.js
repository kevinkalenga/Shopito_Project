import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import orderService from "./orderService"

const initialState = {
    order: null,
    orders: [],
    totalOrderAmount: 0,
    isError: false, 
    isSuccess: false,
    isLoading: false,
    message: "",
}


// Create coupon 
export const createOrder = createAsyncThunk(
  "orders/createOrder",

  async (formData, thunkAPI ) => {
    try {
      return await orderService.createOrder(formData)
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
)

// Get all orders 
export const getOrders = createAsyncThunk(
  "orders/getOrders",

  async (_, thunkAPI ) => {
    try {
      return await orderService.getOrders()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)


// getOrder 

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrder(id);
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

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",

  async ({ id, formData }, thunkAPI) => {
    try {
      return await orderService.updateOrderStatus(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message)
    }
  }
);








const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create order
          .addCase(createOrder.pending, (state) => {
              state.isLoading = true
          })
          .addCase(createOrder.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.orders.push(action.payload);
              toast.success("Order created successfully");
              //console.log(action.payload);
                          
          })
          .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
            // Get orders
          .addCase(getOrders.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(getOrders.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.orders = action.payload;
          })
          .addCase(getOrders.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
              toast.error(action.payload);
          })
          // Get single Coupon
          .addCase(getOrder.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isSuccess = false;
              state.message = "";
          })
                    
          .addCase(getOrder.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
                    
              state.order = action.payload;
              console.log(action.payload)
          })
          .addCase(getOrder.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
                    
              toast.error(action.payload);
          })
          // Update Order Status
          .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
          })

          .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            state.order = action.payload;

            toast.success("Order status updated successfully");
          })

          .addCase(updateOrderStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

            toast.error(action.payload);
          })
  }
});



export const selectOrders = (state) => state.order.orders;
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount;

export default orderSlice.reducer