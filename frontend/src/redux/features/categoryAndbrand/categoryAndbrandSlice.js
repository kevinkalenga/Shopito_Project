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
// Get categories 
export const getCategories = createAsyncThunk(
  "category/getCategories",

  async (_, thunkAPI ) => {
    try {
      return await categoryAndbrandService.getCategories()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

// Update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",

  async ({ id, formData }, thunkAPI) => {
    try {
      return await categoryAndbrandService.updateCategory(id, formData);
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

// Delete Category 
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",

  async (slug, thunkAPI) => {
    try {
      await categoryAndbrandService.deleteCategory(slug);

      return slug; // on renvoie le slug supprimé
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
                state.categories.push(action.payload);
                toast.success("Category created successfully")
                
             })
             .addCase(createCategory.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
               state.message = action.payload;
               toast.error(action.payload);
             })
             // Get categories
             .addCase(getCategories.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(getCategories.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;
                  state.isError = false;
                  state.categories = action.payload;
              })
              .addCase(getCategories.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload;
                  toast.error(action.payload);
              })

              // Update category
              .addCase(updateCategory.pending, (state) => {
                  state.isLoading = true;
              })
              .addCase(updateCategory.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;
                  state.isError = false;

                  const index = state.categories.findIndex(
                    (cat) => cat._id === action.payload._id
                  );

                  if (index !== -1) {
                    state.categories[index] = action.payload;
                  }

                  toast.success("Category updated successfully");
              })
              .addCase(updateCategory.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload;

                  toast.error(action.payload);
              })

              // Delete Category 
              .addCase(deleteCategory.pending, (state) => {
                  state.isLoading = true;
              })

              .addCase(deleteCategory.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.isSuccess = true;

                  state.categories = state.categories.filter(
                      (cat) => cat.slug !== action.payload
                  );

                  toast.success("Category deleted successfully");
              })

              .addCase(deleteCategory.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload;

                  toast.error(action.payload);
              })
  }
});

export const {RESET_CAT} = categoryAndbrandSlice.actions

export default categoryAndbrandSlice.reducer