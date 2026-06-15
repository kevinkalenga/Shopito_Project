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
const logout = async () => {
  localStorage.removeItem("user");
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

const authService = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
}

export default authService