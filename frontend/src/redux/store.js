import {configureStore} from "@reduxjs/toolkit" 
import authReducer from "../redux/features/auth/authSlice"
import categoryReducer from "../redux/features/categoryAndbrand/categoryAndbrandSlice"

export const store = configureStore({
    reducer: {
       auth: authReducer,
       category: categoryReducer,
    }
})