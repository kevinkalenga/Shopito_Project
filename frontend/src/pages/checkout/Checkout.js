import React, {useState, useEffect} from 'react'
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import "./Checkout.scss"
import { extractIdAndCartQuantity } from '../../utils'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CheckoutForm from '../../components/checkout/checkoutForm/CheckoutForm'
import { selectShippingAddress } from '../../redux/features/checkout/checkoutSlice'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const Checkout = () => {
  const [message, setMessage] = useState("Initializing Checkout...")
  const [clientSecret, setClientSecret] = useState("")
  const {cartItems, cartTotalAmount} = useSelector((state) => state.cart)
  const shippingAddress = useSelector(selectShippingAddress);

  const productIDs = extractIdAndCartQuantity(cartItems)

  const {user} = useSelector((state) => state.user)
  const {coupon} = useSelector((state) => state.coupon)
  
// /create-payment-intent
  const description = `Shopito Payment: by email: ${user?.email}, Amount: ${cartTotalAmount}`

  useEffect(() => {
    fetch("http://localhost:5000/api/order/create-payment-intent", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        items: productIDs,
        shipping: shippingAddress,
        description,
        coupon
      })
    }).then((res) => {
      if(res.ok) {
        return res.json()
      }
      return res.json().then((json) => Promise.reject(json))
    })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
         console.error("PAYMENT INTENT ERROR:", error)
        setMessage("Failed to initialize checkout")
        toast.error("Something went wrong!!")
      })
  }, [])

  const appearance = {
    theme: "stripe"
  }
  
  const options = {
    clientSecret,
    appearance
  }
  
  
  return (
    
    <>
      <section>
        <div className='container'>
            {
              !clientSecret && <h3>{message}</h3>
            }
        </div>
      </section>
     
        {
          clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )
        }
      
    </>
  )
}

export default Checkout;