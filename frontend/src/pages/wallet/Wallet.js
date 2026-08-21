import React, { useEffect, useState } from 'react'
import "./Wallet.scss"
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../redux/features/auth/authSlice';
import mcImg from "../../assets/mc_symbol.png"
import { AiOutlineDollarCircle, AiFillDollarCircle, AiFillGift} from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import paymentImg from "../../assets/payment.svg" 
import WalletTransactions from './WalletTransactions';
import { getUserTransactions, RESET_RECEIVER, RESET_TRANSACTION_MESSAGE, selectedTransactions, selectTransactionMessage, selectTransactions, transferFund, verifyAccount } from '../../redux/features/transaction/transactionSlice';
import TransferModal from './TransferModal';
import { toast } from 'react-toastify';
import DepositModal from './DepositModal';

const transactionss = [
  {
    _id: 123456,
    created: "18-08-2026",
    amount: 100,
    sender: "marine0033@gmail.com",
    receiver: "Shopito Store",
    description: "Payment for products",
    status:"success"
  },

] 

const initialState = {
  amount: 0,
  sender: "",
  receiver: "",
  description: "",
  status: "",
}
const initialDepositState = {
  amount: 0,
 paymentMethod:""
 
}

const Wallet = () => {
  
  
   const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth);
    const transactions = useSelector(selectTransactions)
    const [showTransferModal, setShowTransferModal] = useState(false)
    const [showDepositModal, setShowDepositModal] = useState(false)
    const [transferData, setTransferData] = useState(initialState)
    const [depositData, setDepositData] = useState(initialDepositState)
    const {amount: depositAmount, paymentMethod} = depositData
    const [isVerified, setIsVerified] = useState(false) 
    const {isLoading} = useSelector((state) => state.transaction)

    const {amount, sender, receiver, description, status} = transferData 
    const transactionMessage = useSelector(selectTransactionMessage)

    const handleInputChange = (e) => {
      const {name, value} = e.target
      setTransferData({...transferData, [name]: value})
    }
    const handleAccountChange = (e) => {
        const {name, value} = e.target
      setTransferData({...transferData, [name]: value})
      setIsVerified(false)
      dispatch(RESET_TRANSACTION_MESSAGE())
      dispatch(RESET_RECEIVER())
    }
    
    const validateEmail = (email) => {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    

    const verifyUserAccount = () => {
      const receiverEmail = receiver.trim();

      if (!receiverEmail) {
        return toast.error("Please add receiver's account");
      }

      if (!validateEmail(receiverEmail)) {
        return toast.error("Please enter a valid email account");
      }

      dispatch(
        verifyAccount({
          receiver: receiverEmail
        })
      );
    };
    


      const transferMoney = async (e) => {
        e.preventDefault();

        if (amount < 1) {
          return toast.error("Please enter a valid amount");
        }

        if (!description) {
          return toast.error("Please enter a description");
        }

        const formData = {
          ...transferData,
          sender: user.email,
          status: "Success",
        };

        await dispatch(transferFund(formData));

        setShowTransferModal(false);
        setTransferData(initialState);
        setIsVerified(false);

        dispatch(RESET_RECEIVER());
        await dispatch(getUser());
        await dispatch(getUserTransactions());
      };
    
      const depositMoney = () => {

      }

      const handleDepositChange = (e) => {
        const {name, value} = e.target
        setDepositData({...depositData, [name]: value})
      }
    
    
    const closeModal = (e) => {
       if(e.target.classList.contains("cm")) {
        setShowTransferModal(false)
        setShowDepositModal(false)
        setTransferData({...initialState})
        setDepositData({...initialDepositState})
        setIsVerified(false)
       }
    }

      useEffect(() => {
        dispatch(getUser());
      }, [dispatch]);

      useEffect(() => {
        if (user) {
          dispatch(getUserTransactions());
        }
      }, [dispatch, user]);

      useEffect(() => {
         if(transactionMessage === "Account verification successsful!") {
          setIsVerified(true)
         }
      
         dispatch(RESET_TRANSACTION_MESSAGE())
      }, [transactionMessage, dispatch])
  
  
  return (
    <section>
          <div className='container'>
            
            <PageMenu />
            <div className='wallet'>
                <div className='wallet-data --flex-start --flex-dir-column'>
                  <div className='wallet-info --card --mr'>
                      <span>Hello, </span>
                      <h4>{user?.name}</h4>
                      <div className='--underline'></div>
                      <span className='--flex-between'>
                         <p>Account Balance</p>
                         <img src={mcImg} alt="mc" width={50}/>
                      </span>
                      <h4>${user?.balance?.toFixed(2)}</h4>
                      <div className='buttons --flex-center'>
                         <button className='--btn --btn-primary' onClick={() => setShowDepositModal(true)}><AiOutlineDollarCircle /> &nbsp; Deposit Money</button>
                         <button className='--btn --btn-danger' onClick={() => setShowTransferModal(true)}><FaRegPaperPlane /> &nbsp; Transfer</button>
                      </div>
                  </div>
                  <div className='wallet-promo --flex-between --card'>
                      <div className='wallet-text'>
                          <span className='--flex-start'>
                           <AiFillDollarCircle size={25} color='#ff7722' />
                           <h4>Shopito Wallet</h4>
                          </span>
                          <span className='--flex-start'>
                             <h4>Cashback up to 80%</h4>
                            <AiFillGift size={20} color='#007bff' />
                          </span>
                          <span>
                             Use your shopito wallet at checkout and get up to 80% cashback.
                          </span>
                      </div>
                      <div className='wallet-img'>
                          <img src={paymentImg} alt='pay' width={150} />
                      </div>
                  </div>
                </div>
              
                {/* Wallet Transactions */}
                {
                  user !== null && (
                    <WalletTransactions transactions={transactions} user={user} />
                  )
                }
         </div>
         {
          showTransferModal && (
            <TransferModal 
              transferData={transferData}
              isVerified={isVerified}
              isLoading={isLoading} 
              handleInputChange={handleInputChange}
              handleAccountChange={handleAccountChange}
              transferMoney={transferMoney}
              verifyUserAccount={verifyUserAccount}
              closeModal={closeModal}
            />
          )
         }

         {
          showDepositModal && (
            <DepositModal 
             depositData={depositData}
             closeModal={closeModal}
             handleDepositChange={handleDepositChange}
             depositMoney={depositMoney}
            />
          )
         }
        </div>
    </section>
  )
}

export default Wallet