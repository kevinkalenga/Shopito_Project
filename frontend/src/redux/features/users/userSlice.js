import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import userService from './userService'


const initialState = {
    users: [],
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}


export const getUsers = createAsyncThunk(
 "users/getUsers",
 async (_, thunkAPI) => {
   try {
      return await userService.getUsers();
   } catch(error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
   }
 }
)


export const updateUser = createAsyncThunk(
 "users/updateUser",
 async ({id, userData}, thunkAPI) => {
    try {
        return await userService.updateUser(id, userData);
    } catch(error) {
        const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message);
    }
 }
)


export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, thunkAPI) => {

        try {
        return await userService.deleteUser(id);

        } catch(error) {

        const message =
            error.response?.data?.message ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
        }
    }
)


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    RESET_USER(state) {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
    // Get Users
    .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
    })

    .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.users = action.payload;
    })

    .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        toast.error(action.payload);
    })

    // update user 
    .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.users = state.users.map((user) =>
            user._id === action.payload._id
            ? action.payload
            : user
        );

        //toast.success("User updated successfully");
    })
    .addCase(updateUser.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        toast.error(action.payload);

    })

    // delete user 
    .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
    })


    .addCase(deleteUser.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;

        state.users = state.users.filter(
            (user) => user._id !== action.payload
        );

        toast.success("User deleted successfully");

    })


    .addCase(deleteUser.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        toast.error(action.payload);

    })
            

  }
});

export const {RESET_USER} = userSlice.actions

export default userSlice.reducer