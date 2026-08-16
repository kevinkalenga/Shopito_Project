import React from 'react'
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss"
import CheckoutSummary from '../../components/checkout/checkoutSummary/CheckoutSummary'
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotalAmount, selectCartItems, } from '../../redux/features/cart/cartSlice';

import {
  selectShippingAddress,
  selectPaymentMethod
} from "../../redux/features/checkout/checkoutSlice";

const CheckoutWithFlutterWave = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const cartItems = useSelector(selectCartItems);
   const cartTotalAmount = useSelector(selectCartTotalAmount);
   const paymentMethod = useSelector(selectPaymentMethod);
   const shippingAddress = useSelector(selectShippingAddress);
   const {user} = useSelector((state) => state.auth)
   const { coupon } = useSelector((state) => state.coupon);
  
  //  function makePayment() {
  //    // eslint-disable-next-line no-undef 
  //     FlutterwaveCheckout({
  //       public_key: process.env.REACT_APP_FLW_PK,
  //       tx_ref: `shopito-${Date.now()}`,
  //       amount: cartTotalAmount,
  //       currency: 'USD',
  //       payment_options: 'card',
  //       redirect_url:`${process.env.REACT_APP_BACKEND_URL}/api/order/flutterwave-response` ,
  //       // meta: {
  //       //   consumer_id: 23,
  //       //   consumer_mac: '92a3-912ba-1192a',
  //       // },
  //       customer: {
  //         email: user.email,
  //         phone_number: user.phone,
  //         name: user.name,
  //       },
  //       customizations: {
  //         title: 'Shopito Online Store',
  //         description: 'Payment for product',
  //         logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
  //       },
  //     });
  //   }

     const makePayment = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/order/create-flutterwave-payment`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: cartItems.map((item) => ({
                  _id: item._id,
                  quantity: item.cartQuantity,
                })),
                shipping: shippingAddress,
                description: "Shopito Payment",
                coupon,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Flutterwave error");
          }

          window.location.href = data.paymentLink;

        } catch (error) {
          console.error("Flutterwave error:", error);
        }
      };
        
        
  
  return (
    <>
      <section>
         <div className={`container ${styles.checkout}`}>
           <h2>
             Checkout
           </h2>
           <form>
              <div>
                <Card cardClass={styles.card}>
                   <CheckoutSummary />
                </Card>
              </div>
              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                  <h3>Flutterwave Checkout</h3>
                
                  <button 
                   type='button'
                   className={styles.button}
                   onClick={makePayment}
                  >
                    Pay Now
                  </button>
                     
                </Card>
              </div>
           </form>
         </div>
      </section>
     </>

  )
}

export default CheckoutWithFlutterWave