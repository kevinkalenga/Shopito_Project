import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const USERS_URL = `${BACKEND_URL}/api/users`;

const getUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
};

const updateUser = async (id, userData) => {
    const response = await axios.patch(
        `${USERS_URL}/${id}`,
        userData,
        // {
        //   withCredentials: true,
        // }
    );

    return response.data;
};

const userService = {
    getUsers,
    updateUser
}

export default userService