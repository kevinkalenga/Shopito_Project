import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/coupon/`;

// Create Category

const createCoupon = async (formData) => {
    const response = await axios.post(API_URL + "createCoupon", formData)

    return response.data
}


const couponService = {
    createCoupon,
}

export default couponService