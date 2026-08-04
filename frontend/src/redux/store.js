import {configureStore} from "@reduxjs/toolkit" 
import authReducer from "../redux/features/auth/authSlice"
import categoryReducer from "../redux/features/categoryAndbrand/categoryAndbrandSlice"
import brandReducer from "../redux/features/categoryAndbrand/categoryAndbrandSlice"
import productReducer from "../redux/features/product/productSlice"
import filterReducer from "../redux/features/product/filterSlice"
import couponReducer from "../redux/features/coupon/couponSlice"
import userReducer from "../redux/features/users/userSlice"

export const store = configureStore({
    reducer: {
       auth: authReducer,
       category: categoryReducer,
       brand: brandReducer,
       product:productReducer,
       coupon:couponReducer,
       user:userReducer,
       filter: filterReducer
    }
})