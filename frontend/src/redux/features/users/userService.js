import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const USERS_URL = `${BACKEND_URL}/api/users`;

const getUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
};

const userService = {
    getUsers
}

export default userService