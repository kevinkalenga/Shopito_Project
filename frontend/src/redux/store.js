import {configureStore} from "@reduxjs/toolkit" 
import authReducer from "../redux/features/auth/authSlice"
import categoryReducer from "../redux/features/categoryAndbrand/categoryAndbrandSlice"
import brandReducer from "../redux/features/categoryAndbrand/categoryAndbrandSlice"
import productReducer from "../redux/features/product/productSlice"
import couponReducer from "../redux/features/coupon/couponSlice"

export const store = configureStore({
    reducer: {
       auth: authReducer,
       category: categoryReducer,
       brand: brandReducer,
       product:productReducer,
       coupon:couponReducer
    }
})