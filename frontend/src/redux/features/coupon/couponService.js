import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/coupon/`;

// Create Coupon

const createCoupon = async (formData) => {
    const response = await axios.post(API_URL + "createCoupon", formData)

    return response.data
}

// Get all coupons

const getCoupons = async () => {
    const response = await axios.get(API_URL + "getCoupons")

    return response.data
}


// Get coupon
const getCoupon = async (couponName) => {
  const response = await axios.get(API_URL + "getCoupon/" + couponName);
   return response.data;
};

// Update Coupon
const updateCoupon = async (id, formData) => {
  const response = await axios.put(`${API_URL}${id}`, formData);
   return response.data;
};


const couponService = {
    createCoupon,
    getCoupons,
    getCoupon,
    updateCoupon
}

export default couponService