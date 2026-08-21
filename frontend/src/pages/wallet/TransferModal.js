import React from 'react'
import "./TransferModal.scss"
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { useRef } from 'react';
import { useEffect } from 'react';

const TransferModal = ({
   transferData, 
   isVerified,
   isLoading, 
   handleInputChange, 
   handleAccountChange, 
   verifyUserAccount, 
   transferMoney, closeModal}) => {
  
  const inputRef = useRef(null) 

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
    return (
    <section className='--100vh modal-section'>
      <div className='--flex-center modal'>
         <div className='--bg-light --p --card modal-content'>
            <AiOutlineCloseCircle color='red' size={16}
             className='close-icon cm' onClick={(e) => closeModal(e)}/>
             <div className='--flex-start modal-head --my'>
               <AiOutlineInfoCircle color='orangered' size={18} />
               <h3 className='--text-p --ml'>Send Money To Someone</h3>
             </div>
             <div className='modal-body'>
                 <form onSubmit={transferMoney}>
                    <p className='req'>
                      <label>Amount</label>
                      <input ref={inputRef} type='number' placeholder='Amount' name='amount'
                       value={transferData.amount}
                       onChange={handleInputChange} 
                       required/>
                    </p>
                    <p className='req'>
                        <label>Receivers Account</label>
                        <span className='--flex-end'>
                          <input type='text' placeholder="Receiver's Account" name='receiver'
                          value={transferData.receiver}
                          onChange={handleAccountChange} 
                          required/>
                          <input className='--btn --btn-danger --btn-lg' type='button'  name='verify'
                          value={"Verify"}
                          onClick={verifyUserAccount}
                          />
                        </span>
                    </p>
                    <p className='req'>
                      <label>Description</label>
                      <input type='text' placeholder='Description' name='description'
                       value={transferData.description}
                       onChange={handleInputChange} 
                       required/>
                    </p>
                    {
                      !isVerified && (
                        <p className='--color-danger'>Please click the very button above!!!</p>
                      )
                    }
                    {
                      isVerified && (
                        <span className='--flex-end'>
                            <button className='--btn --btn-lg cm' onClick={(e) => closeModal(e)}>Cancel</button>
                            {
                              isLoading ? (
                                 <button type='button' className='--btn --btn-primary cm' disabled>Sending...</button>
                              ) : (
                                  <button type='submit' className='--btn --btn-primary cm'>Send</button>
                              )
                            }
                        </span>
                      )
                    }
                 </form>
             </div>
         </div>
      </div>
    </section>
  )
}

export default TransferModal;