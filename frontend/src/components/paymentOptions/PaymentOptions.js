import React, { useState } from 'react'
import "./Radio.scss"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { SAVE_PAYMENT_METHOD } from '../../redux/features/checkout/checkoutSlice';

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
    const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const setPayment = (e) => {
    e.preventDefault()
    if(paymentMethod === "") {
      return toast.error("Please select a payment method.")
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod))
    if(isLoggedIn) {
      navigate("/checkout-details")
    } else {
      // after the login redirect the user to the cart page
       navigate("/login?redirect=cart")
    }
    //console.log(paymentMethod)
  }
  
  
  return (
    <>
      <p>Please choose a payment method</p>
      <form className='--form-control' onSubmit={setPayment}>
         <label htmlFor='stripe' className='radio-label'>
           <input 
           className='radio-input'
             type='radio'
             name="paymentMethod"
             id="stripe"
             value={"stripe"}
             onChange={(e) => setPaymentMethod(e.target.value)}
           />
           <span className='custom-radio'></span> Stripe
         </label>
         <label htmlFor='flutterwave' className='radio-label'>
           <input 
           className='radio-input'
             type='radio'
             name="paymentMethod"
             id="flutterwave"
             value={"flutterwave"}
             onChange={(e) => setPaymentMethod(e.target.value)}
           />
           <span className='custom-radio'></span> Flutterwave
         </label>
         <label htmlFor='paypal' className='radio-label'>
           <input 
           className='radio-input'
             type='radio'
             name="paymentMethod"
             id="paypal"
             value={"paypal"}
             onChange={(e) => setPaymentMethod(e.target.value)}
           />
           <span className='custom-radio'></span> PayPal
         </label>
         <label htmlFor='wallet' className='radio-label'>
           <input 
           className='radio-input'
             type='radio'
             name="paymentMethod"
             id="wallet"
             value={"wallet"}
             onChange={(e) => setPaymentMethod(e.target.value)}
           />
           <span className='custom-radio'></span> Wallet
         </label>
         <button type='submit' className='--btn --btn-primary --btn-block'>Checkout</button>
      </form>
    </>
  )
}

export default PaymentOptions