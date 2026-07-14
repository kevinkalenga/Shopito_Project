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

// Update Category
const updateCategory = async (id, formData) => {
    const response = await axios.put(
        API_URL + `category/${id}`,
        formData
    );

    return response.data;
};

// Delete Category
const deleteCategory = async (slug) => {
    const response = await axios.delete(
        API_URL + `category/${slug}`
    );

    return response.data;
};


// Create Brand

const createBrand = async (formData) => {
    const response = await axios.post(API_URL + "category/createBrand", formData)

    return response.data
}








const categoryAndbrandService = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    createBrand,
}

export default categoryAndbrandService