import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// export const API_URL = `${BACKEND_URL}/api/order/createOrder`;

const CREATE_ORDER_URL = `${BACKEND_URL}/api/order/createOrder`;
const GET_ORDERS_URL = `${BACKEND_URL}/api/order/getOrders`;



// Create Order

const createOrder = async (formData) => {
    const response = await axios.post(CREATE_ORDER_URL, formData)

    return response.data.message
}


// Get all orders

const getOrders = async () => {
    const response = await axios.get(GET_ORDERS_URL)

    return response.data
}



const orderService = {
   createOrder,
   getOrders
}

export default orderService