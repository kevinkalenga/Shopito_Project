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

const authService = {
    register,
    login,
    logout
}

export default authService