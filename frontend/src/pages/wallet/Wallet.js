import React, { useEffect } from 'react'
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
import { getUserTransactions, selectedTransactions, selectTransactions } from '../../redux/features/transaction/transactionSlice';

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
  {
    _id: 789453,
    created: "16-08-2026",
    amount: 100,
    sender: "marine0033@gmail.com",
    receiver: "Shopito Store",
    description: "Payment for products",
    status:"success"
  },
]

const Wallet = () => {
  
  
   const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth);
    const transactions = useSelector(selectTransactions)

      useEffect(() => {
        dispatch(getUser());
      }, [dispatch]);

      useEffect(() => {
        if (user) {
          dispatch(getUserTransactions());
        }
      }, [dispatch, user]);
  
  
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
                         <button className='--btn --btn-primary'><AiOutlineDollarCircle /> &nbsp; Deposit Money</button>
                         <button className='--btn --btn-danger'><FaRegPaperPlane /> &nbsp; Transfer</button>
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
             </div>
             {/* Wallet Transactions */}
             {
               user !== null && (
                 <WalletTransactions transactions={transactions} user={user} />
               )
             }
         </div>
    </section>
  )
}

export default Wallet