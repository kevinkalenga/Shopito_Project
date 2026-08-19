import React, { useEffect } from 'react'
import "./Wallet.scss"
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../redux/features/auth/authSlice';
import mcImg from "../../assets/mc_symbol.png"
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";

const Wallet = () => {
  
  
   const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
      dispatch(getUser())
    }, [dispatch, user])
  
  
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
                  <div className='wallet-promo'>
                    Wallet Promo
                  </div>
                </div>
             </div>
             {/* Wallet Transactions */}
         </div>
    </section>
  )
}

export default Wallet