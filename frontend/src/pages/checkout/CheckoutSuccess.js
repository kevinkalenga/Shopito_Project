import React, { useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom"
import Confetti from "react-confetti"
import { useDispatch, useSelector } from "react-redux"
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/features/cart/cartSlice'
import { selectPaymentMethod, selectShippingAddress } from "../../redux/features/checkout/checkoutSlice"
import { createOrder } from '../../redux/features/order/orderSlice'

const CheckoutSuccess = () => {

  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()

  const transactionId = searchParams.get("transaction_id")
  const txRef = searchParams.get("tx_ref")
  const transactionAmount = searchParams.get("amount")

  const cartItems = useSelector(selectCartItems)
  
  const shippingAddress = useSelector(selectShippingAddress)
  const paymentMethod = useSelector(selectPaymentMethod)

  const { coupon } = useSelector((state) => state.coupon)

    useEffect(() => {

      const saveOrder = async () => {

              if (!transactionId || !txRef) return

              const today = new Date()

              const formData = {
                orderDate: today.toDateString(),
                orderTime: today.toLocaleTimeString(),
                orderAmount: Number(transactionAmount),
                orderStatus: 'Order Placed...',
                cartItems,
                shippingAddress,
                paymentMethod,
                coupon: coupon != null ? coupon : { name: 'nil' },

                paymentStatus: 'paid',
                tx_ref: txRef,
                transactionId
              }

              const result = await dispatch(createOrder(formData))

              if (createOrder.fulfilled.match(result)) {
                dispatch(CLEAR_CART())
                console.log("ORDER CREATED SUCCESSFULLY")
              }

            }

            saveOrder()

      }, [transactionId, txRef])

      useEffect(() => {
        dispatch(CLEAR_CART());
      }, [dispatch]);

  return (
    <>
      <Confetti />

      <section style={{ height: "77vh" }}>
        <div className='container'>

          <h2>Checkout Successful</h2>

          <p>Thank you for your purchase</p>

          <br />

          <button className='--btn --btn-primary'>
            <Link to="/order-history">
              View Order Status
            </Link>
          </button>

        </div>
      </section>
    </>
  )
}

export default CheckoutSuccess