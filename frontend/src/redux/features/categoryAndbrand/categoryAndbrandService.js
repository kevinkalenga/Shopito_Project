import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// Create Category

const createCategory = async (formData) => {
    const response = await axios.post(API_URL + "category/createCategory", formData)

    return response.data
}

const categoryAndbrandService = {
    createCategory,
}

export default categoryAndbrandService