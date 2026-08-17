import React, { useEffect, useState } from 'react'
import styles from "./CheckoutForm.module.scss"
import {PaymentElement, LinkAuthenticationElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {toast} from "react-toastify"
import Card from '../../card/Card'
import CheckoutSummary from '../checkoutSummary/CheckoutSummary'
import { Spinner } from '../../loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotalAmount, CLEAR_CART } from '../../../redux/features/cart/cartSlice'
import { selectPaymentMethod, selectShippingAddress } from '../../../redux/features/checkout/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../../redux/features/order/orderSlice'

const CheckoutForm = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems)
  const shippingAddress = useSelector(selectShippingAddress)
  const paymentMethod = useSelector(selectPaymentMethod)
  const {coupon} = useSelector((state) => state.coupon)

  // const saveOrder = () => {
  //   const today = new Date()
  //   const formData = {
  //     // Create according to the backend
  //     orderDate: today.toDateString(),
  //     orderTime: today.toLocaleTimeString(),
  //     orderAmount: cartTotalAmount,
  //     orderStatus: 'Order Placed...',
  //     cartItems,
  //     shippingAddress,
  //     paymentMethod,
  //     coupon: coupon != null ? coupon : { name: 'nil'}
  //   }
  //   dispatch(createOrder(formData))
  //   navigate("/checkout-success")
  // }

    const saveOrder = async (paymentIntentId) => {
        console.log("🔥🔥🔥 SAVE ORDER CALLED 🔥🔥🔥");

        try {
          const today = new Date();

          console.log("========== SAVE ORDER ==========");
          console.log("CART ITEMS:", cartItems);
          console.log("TOTAL:", cartTotalAmount);
          console.log("PAYMENT METHOD:", paymentMethod);
          console.log("PAYMENT INTENT ID:", paymentIntentId);
          console.log("SHIPPING ADDRESS:", shippingAddress);

          const formData = {
            orderDate: today.toDateString(),
            orderTime: today.toLocaleTimeString(),
            orderAmount: cartTotalAmount,
            orderStatus: "Order Placed...",
            cartItems,
            shippingAddress,
            paymentMethod,
            paymentStatus: "paid",
            transactionId: paymentIntentId,
            coupon: coupon != null ? coupon : { name: "nil" },
          };

          console.log("SENDING ORDER TO BACKEND...");

          const result = await dispatch(createOrder(formData)).unwrap();

          console.log("========== ORDER CREATED ==========");
          console.log(result);

          // IMPORTANT :
          // On vide le panier uniquement APRÈS
          // la création réussie de la commande.
          dispatch(CLEAR_CART());

          toast.success("Order created successfully");

          navigate("/checkout-success");

        } catch (error) {

          console.error("========== CREATE ORDER ERROR ==========");
          console.error(error);

          toast.error(
            error?.message ||
            "The payment succeeded but the order could not be created"
          );
        }
      };

  useEffect(() => {
     if(!stripe) {
       return
     }

     const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

     if(!clientSecret) {
      return;
     }

  

  }, [stripe])

  // const handleSubmit = async (e) => {
  //    e.preventDefault();
  //    setMessage(null)

  //    if(!stripe || !elements) {
  //     return;
  //    }
  //    setIsLoading(true)

  //   await stripe.confirmPayment({
  //      elements, 
  //      confirmParams: {
  //       return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
  //      },
  //      redirect: "if_required",
  //    }).then((result) => {
  //      if(result.error) {
  //         toast.error(result.error.message)
  //         setMessage(result.error.message)
  //         return;
  //      }
  //      if(result.paymentIntent) {
  //        if(result.paymentIntent.status === "succeeded") {
  //         setIsLoading(false)
  //         toast.success("Payment Successful")
  //         saveOrder()
  //        }
  //      }
  //    })

  //    setIsLoading(false)
  // }

     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
          // 1. Valider le PaymentElement
          const { error: submitError } = await elements.submit();

          if (submitError) {
            toast.error(submitError.message);
            setMessage(submitError.message);
            setIsLoading(false);
            return;
          }

          // 2. Confirmer le paiement Stripe
          const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
            },
            redirect: "if_required",
          });

          if (result.error) {
            toast.error(result.error.message);
            setMessage(result.error.message);
            setIsLoading(false);
            return;
          }

          // 3. Paiement réussi
          if (result.paymentIntent?.status === "succeeded") {
            console.log("========== STRIPE PAYMENT SUCCESS ==========");
            console.log("PAYMENT INTENT:", result.paymentIntent.id);
            console.log("STATUS:", result.paymentIntent.status);

            toast.success("Payment Successful");

            // Créer la commande en BD
            await saveOrder();
          }

        } catch (error) {
          console.error("STRIPE PAYMENT ERROR:", error);

          toast.error(
            error?.message || "Payment failed"
          );

          setMessage(error?.message || "Payment failed");
        } finally {
          setIsLoading(false);
        }
      };

      const paymentElementOptions = {
        layout: "tabs"
      }
  
  return (
     <>
      <section>
         <div className={`container ${styles.checkout}`}>
           <h2>
             Checkout
           </h2>
           <form onSubmit={handleSubmit}>
              <div>
                <Card cardClass={styles.card}>
                   <CheckoutSummary />
                </Card>
              </div>
              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                  <h3>Stripe Checkout</h3>
                  <PaymentElement 
                    id={styles["payment-element"]}
                    options={paymentElementOptions}
                  />
                  <button
                   disabled={isLoading || !stripe || !elements}
                   id='submit'
                   className={styles.button}
                  >
                     <span id="button-text">
                         {
                          isLoading ? (
                            <Spinner />
                          ) : (
                            "Pay Now"
                          )
                         }
                     </span>
                  </button>
                  {message && <div id={styles["payment-message"]}>{message}</div>}
                </Card>
              </div>
           </form>
         </div>
      </section>
     </>
    
   
  )
}

export default CheckoutForm;