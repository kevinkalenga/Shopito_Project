import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import categoryAndbrandService from './categoryAndbrandService'

const initialState = {
    categories: [],
    isError: false, 
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create category 
export const createCategory = createAsyncThunk(
  "category/createCategory",

  async (formData, thunkAPI ) => {
    try {
      return await categoryAndbrandService.createCategory(formData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)




const categoryAndbrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CAT(state){
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    }
  },

  extraReducers: (builder) => {
    builder 
            // Create category
             .addCase(createCategory.pending, (state) => {
                state.isLoading = true
             })
             .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.category.push(action.payload);
                toast.success("Category created successfully")
                
             })
             .addCase(createCategory.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
               state.message = action.payload;
               toast.error(action.payload);
             })
  }
});

export const {RESET_CAT} = categoryAndbrandSlice.actions

export default categoryAndbrandSlice.reducer