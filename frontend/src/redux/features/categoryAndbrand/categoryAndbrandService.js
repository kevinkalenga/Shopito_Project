import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// Create Category

const createCategory = async (formData) => {
    const response = await axios.post(API_URL + "category/createCategory", formData)

    return response.data
}
// Get Categories

const getCategories = async () => {
    const response = await axios.get(API_URL + "category/getCategories")

    return response.data
}

const categoryAndbrandService = {
    createCategory,
    getCategories
}

export default categoryAndbrandService