import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from './transactionService'
import {toast} from 'react-toastify'

const initialState = {
   transaction: null,
   transactions: [],
    isError: false, 
    isSuccess: false,
    isLoading: false,
    message: "",
}


// getUserTransactions
export const getUserTransactions = createAsyncThunk(
  "transactions/getUserTransactions",

  async (_, thunkAPI ) => {
    try {
      return await transactionService.getUserTransactions()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)





const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder 
      //Get products 
            .addCase(getUserTransactions.pending, (state) => {
                  state.isLoading = true;
                  state.isError = false;
                  state.isSuccess = false;
                  state.message = "";
            })
            .addCase(getUserTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.transactions = action.payload;
            })
            .addCase(getUserTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
  }
});

export const {} = transactionSlice.actions 

export const selectedTransactions = (state) => state.transaction.transactions

export default transactionSlice.reducer