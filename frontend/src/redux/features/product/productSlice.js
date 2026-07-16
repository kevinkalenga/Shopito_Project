import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import productService from './productService'

const initialState = {
   product: null,
   products: [],
   minPrice: null,
   maxPrice: null,
   totalStoreValue: 0,
   outOfStock: 0,
   categories: [],
   isError: false, 
   isSuccess: false,
   isLoading: false,
   message: "",

}




// Create category 
export const createProduct = createAsyncThunk(
  "products/createProduct",

  async (formData, thunkAPI ) => {
    try {
      return await productService.createProduct(formData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder
        // Create category
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.products.push(action.payload);
            toast.success("Product created successfully")
                      
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
  }
});

export const {} = productSlice.actions

export default productSlice.reducer 




