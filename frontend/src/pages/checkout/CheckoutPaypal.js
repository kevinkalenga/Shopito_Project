import React from 'react'
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss"
import CheckoutSummary from '../../components/checkout/checkoutSummary/CheckoutSummary'
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  selectShippingAddress,
  selectPaymentMethod
} from "../../redux/features/checkout/checkoutSlice";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/features/cart/cartSlice';
import { createOrder } from '../../redux/features/order/orderSlice';
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';

const CheckoutPaypal = () => {
  
  
    
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const cartItems = useSelector(selectCartItems);
   const cartTotalAmount = useSelector(selectCartTotalAmount);
   const paymentMethod = useSelector(selectPaymentMethod);
   const shippingAddress = useSelector(selectShippingAddress);
   
   const { coupon } = useSelector((state) => state.coupon);

   const initialOptions = {
     clientId : process.env.REACT_APP_PAYPAL_CID,
     currency: "USD",
     intent: "capture"
   }
   

    const saveOrder = async (paymentIntentId) => {
           console.log("SAVE ORDER CALLED");
   
           try {
             const today = new Date();
   
            
   
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
  
  
  
  
  return (
       <>
       
          <PayPalScriptProvider options={initialOptions}>
              <section>
                <div className={`container ${styles.checkout}`}>
                  <h2>Checkout</h2>

                  <form>
                    <div>
                      <Card cardClass={styles.card}>
                        <CheckoutSummary />
                      </Card>
                    </div>

                    <div>
                      <Card cardClass={`${styles.card} ${styles.pay}`}>
                        <h3>PayPal Checkout</h3>

                        <div style={{ width: "100%", minHeight: "200px" }}>
                          <PayPalButtons
                            style={{
                              layout: "vertical",
                              color: "gold",
                              shape: "rect",
                              label: "paypal",
                            }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: Number(cartTotalAmount).toFixed(2),
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={async (data, actions) => {
                              try {
                                const details = await actions.order.capture();

                                console.log("PAYPAL SUCCESS:", details);

                                await saveOrder(details.id);
                              } catch (error) {
                                console.error("PAYPAL CAPTURE ERROR:", error);
                                toast.error("Payment failed");
                              }
                            }}
                            onError={(error) => {
                              console.error("PAYPAL ERROR:", error);
                              toast.error("PayPal payment failed");
                            }}
                          />
                        </div>
                      </Card>
                    </div>
                  </form>
                </div>
              </section>
          </PayPalScriptProvider>
       
       
       </>

  )
}

export default CheckoutPaypal