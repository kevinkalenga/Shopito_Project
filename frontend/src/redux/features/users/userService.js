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
       
    );

    return response.data;
};

const deleteUser = async (id) => {

    await axios.delete(`${USERS_URL}/${id}`, {
        withCredentials: true,
    });

    return id;
};

const userService = {
    getUsers,
    updateUser,
    deleteUser
}

export default userService