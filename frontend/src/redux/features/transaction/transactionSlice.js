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
// verifyAccount
export const verifyAccount = createAsyncThunk(
  "transactions/verifyAccount",

  async (formData, thunkAPI ) => {
    try {
      return await transactionService.verifyAccount(formData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)
// transferFund
export const transferFund = createAsyncThunk(
  "transactions/transferFund",

  async (formData, thunkAPI ) => {
    try {
      return await transactionService.transferFund(formData)
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
  reducers: {
    RESET_TRANSACTION_MESSAGE(state) {
       state.message = ""
    }
  },
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
      //VerifyAccount 
            .addCase(verifyAccount.pending, (state) => {
                  state.isLoading = true;
              
            })
            .addCase(verifyAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
                toast.success(action.payload)
            })
            .addCase(verifyAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
      //transferFund 
            .addCase(transferFund.pending, (state) => {
                  state.isLoading = true;
              
            })
            .addCase(transferFund.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
                toast.success(action.payload)
            })
            .addCase(transferFund.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
  }
});

export const {RESET_TRANSACTION_MESSAGE} = transactionSlice.actions 

export const selectTransactions = (state) => state.transaction.transactions;
export const selectTransactionMessage = (state) => state.transaction.message;

export default transactionSlice.reducer;