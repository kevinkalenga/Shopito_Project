import React from 'react'
import "./DepositModal.scss"
import { useRef, useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";

const DepositModal = ({depositData, closeModal, handleDepositChange, depositMoney}) => {
  
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
                 <form onSubmit={depositMoney}>
                    <p className='req'>
                      <label>Amount</label>
                      <input ref={inputRef} type='number' placeholder='Amount' name='amount'
                       value={depositData.amount}
                       onChange={handleDepositChange} 
                       required/>
                    </p>

                    <p>
                       <label htmlFor='stripe' className='radio-label'>
                       <input className='radio-input' type='radio'
                         name='paymentMethod'
                         id='stripe'
                         value={"stripe"}
                         onChange={handleDepositChange} 
                         />
                         <span className='custom-radio' />
                         Stripe
                       </label>
                    </p>
                    <br />
                    <p>
                       <label htmlFor='flutterwave' className='radio-label'>
                       <input className='radio-input' type='radio'
                         name='paymentMethod'
                         id='flutterwave'
                         value={"flutterwave"}
                         onChange={handleDepositChange} 
                         />
                         <span className='custom-radio' />
                         Flutterwave
                       </label>
                    </p>
                    <br />
                    <span className='--flex-end'>
                        <button className='--btn --btn-lg cm' onClick={(e) => closeModal(e)}>Cancel</button>
                        <button type='submit' className='--btn --btn-primary cm'>
                          Proceed
                        </button>
                    </span> 
                   
                    
                 </form>
             </div>
         </div>
      </div>
    </section>

  )
}

export default DepositModal