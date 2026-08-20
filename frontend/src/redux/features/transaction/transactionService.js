import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/transaction`;

// getUserTransactions 
const getUserTransactions = async () => {
    const response = await axios.get(API_URL + "/getUserTransactions")
     console.log(response);
    return response.data;
}

// verifyAccount 
const verifyAccount = async (formData) => {
    const response = await axios.post(API_URL + "/verifyAccount", formData)
     console.log(response);
    return response.data.message;
}


const transactionService = {
   getUserTransactions,
   verifyAccount
}



export default transactionService;