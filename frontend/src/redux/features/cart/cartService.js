import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Save Cart

const saveCartDB = async (cartData) => {
    const response = await axios.patch(API_URL + "saveCart", cartData)

    return response.data;
}


const cartService = {
   saveCartDB
}

export default cartService;