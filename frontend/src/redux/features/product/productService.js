import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// export const API_URL = `${BACKEND_URL}/api/products/create`;

const PRODUCTS_URL = `${BACKEND_URL}/api/products`;
const CREATE_URL = `${BACKEND_URL}/api/products/create`;


// Create Product

const createProduct = async (formData) => {
    const response = await axios.post(CREATE_URL, formData)

    return response.data
}
// Get Products

const getProducts = async () => {
    const response = await axios.get(PRODUCTS_URL)
     console.log(response);
    return response.data
}

// Delete Product
const deleteProduct = async (id) => {
  await axios.delete(`${PRODUCTS_URL}/${id}`);
  return id;
};
// Get Product
const getProduct = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`);
   return response.data;;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${PRODUCTS_URL}/${id}`, formData);
   return response.data;;
};

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct

}



export default productService