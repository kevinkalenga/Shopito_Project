import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register User 
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData)

    return response.data
}

// Login
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout User
// const logout = async () => {
//   localStorage.removeItem("user");
// };

const logout = async () => {
  const response = await axios.get(API_URL + "logout", {
    
  });

  localStorage.removeItem("user");

  return response.data;
};
// Get login status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus");
     return response.data;
};

// FORGOT PASSWORD
const forgotPassword = async (email) => {
  const response = await axios.post(API_URL + "forgot-password", { email });
  return response.data;
};

// RESET PASSWORD
const resetPassword = async ({ token, newPassword }) => {
  const response = await axios.post(
    API_URL + `reset-password/${token}`,
    { newPassword }
  );
  return response.data;
};

// Get user
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
     return response.data;
};
// Update user profile
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData);
     return response.data;
};
// Update photo
const updatePhoto = async (userData) => {
    const response = await axios.patch(API_URL + "updatePhoto", userData);
     return response.data;
};

// Add to wishlist
const addToWishlist = async (productData) => {
    const response = await axios.post(API_URL + "addToWishlist", productData);
     return response.data.message;
};
// get wishlist
const getWishlist = async () => {
    const response = await axios.get(API_URL + "getWishlist");
     return response.data;
};
// remove wishlist
const removeFromWishlist = async (productId) => {
    const response = await axios.put(API_URL + `wishlist/${productId}`);
     return response.data.message;
};

const authService = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getLoginStatus,
    getUser,
    updateUser,
    updatePhoto,
    addToWishlist,
    getWishlist,
    removeFromWishlist
}

export default authService