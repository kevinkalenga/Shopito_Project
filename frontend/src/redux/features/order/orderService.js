import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/order/`;

// Create Coupon

const createOrder = async (formData) => {
    const response = await axios.post(API_URL, formData)

    return response.data.message
}



const orderService = {
   createOrder
}

export default orderService