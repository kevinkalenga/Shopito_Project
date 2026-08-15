import React from 'react'
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss"
import CheckoutSummary from '../../components/checkout/checkoutSummary/CheckoutSummary'
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotalAmount } from '../../redux/features/cart/cartSlice';

const CheckoutWithFlutterWave = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const cartTotalAmount = useSelector(selectCartTotalAmount);
   const {user} = useSelector((state) => state.auth)
  
   function makePayment() {
     // eslint-disable-next-line no-undef 
      FlutterwaveCheckout({
        public_key: process.env.REACT_APP_FLW_PK,
        tx_ref: `shopito-${Date.now()}`,
        amount: cartTotalAmount,
        currency: 'USD',
        payment_options: 'card, mobilemoneyghana, ussd',
        redirect_url:`${process.env.REACT_APP_BACKEND_URL}/api/order/response` ,
        // meta: {
        //   consumer_id: 23,
        //   consumer_mac: '92a3-912ba-1192a',
        // },
        customer: {
          email: user?.email,
          phone_number: user?.phone,
          name: user?.name,
        },
        customizations: {
          title: 'Shopito Online Store',
          description: 'Payment for product',
          logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
        },
      });
    }
  
  
  
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