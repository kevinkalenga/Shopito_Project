import axios from "axios" 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/transaction`;

// getUserTransactions 

const getUserTransactions = async () => {
    const response = await axios.get(API_URL + "/getUserTransactions")
     console.log(response);
    return response.data;
}


const transactionService = {
   getUserTransactions,
}



export default transactionService;