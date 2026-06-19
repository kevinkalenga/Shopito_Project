import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import {toast} from 'react-toastify'

const initialState = {
   isLoggedIn: false,
   user: null,
   isError: false, 
   isSuccess: false,
   isLoading: false,
   message: "",

  isForgotSuccess: false,
  isResetSuccess: false,
}

// Register User 
export const register = createAsyncThunk(
  "auth/register",

  async (userData, thunkAPI ) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || 
      error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

export const login = createAsyncThunk(
  "auth/login",

  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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


export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await authService.logout();
  }
);
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      return await authService.resetPassword({ token, newPassword });
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







const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state){
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {

    builder
       // REGISTER
    .addCase(register.pending, (state) => {
       state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
       state.isLoading = false;
       state.isSuccess = true;
       state.isLoggedIn = true;
       state.user = action.payload;
       toast.success("Registration Success")
       
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
      toast.error(action.payload);
    })
     // LOGIN
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      toast.success("Login Success");
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
      toast.error(action.payload);
    })

    // LOGOUT 
    .addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      toast.success("Logged out");
    })
    .addCase(getLoginStatus.pending, (state) => {
       state.isLoading = true;
     })
     // getLoginStatus 
    .addCase(getLoginStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = action.payload;
    })
    .addCase(getLoginStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.isLoggedIn = false;
    })
     // FORGOT PASSWORD
    .addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.isForgotSuccess = true;
      toast.success("Reset email sent");
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    // RESET PASSWORD
    .addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.isResetSuccess = true;
      toast.success("Password reset successful");
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });
  }
});

export const { RESET_AUTH} = authSlice.actions

export default authSlice.reducer