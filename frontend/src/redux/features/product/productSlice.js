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




// Create product 
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
// getProducts 
export const getProducts = createAsyncThunk(
  "products/getProducts",

  async (_, thunkAPI ) => {
    try {
      return await productService.getProducts()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

// deleteProduct 

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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
// getProduct 

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
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
// updateProduct 

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({id, formData}, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
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


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PROD(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
     builder
        // Create product
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
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
        //Get products 
        .addCase(getProducts.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isSuccess = false;
              state.message = "";
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        // Delete Product 
        .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        })

        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );

            toast.success("Product deleted successfully");
        })

        .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

            toast.error(action.payload);
        })

        // Get single Product
        .addCase(getProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        })

        .addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            state.product = action.payload;
            //console.log(action.payload)
        })

        .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

            toast.error(action.payload);
        })

        // Update Product
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        })

        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            state.product = action.payload;

            // Mise à jour dans la liste
            state.products = state.products.map((product) =>
                product._id === action.payload._id
                    ? action.payload
                    : product
            );

            // toast.success("Product updated successfully");
        })

        .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

            toast.error(action.payload);
        })
  }
});

export const {RESET_PROD} = productSlice.actions

export default productSlice.reducer 




