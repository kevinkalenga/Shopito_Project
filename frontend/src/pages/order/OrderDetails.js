import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../redux/features/order/orderSlice';
import { Spinner } from '../../components/loader/Loader';

const OrderDetails = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {id} = useParams()
   
   const {isLoading, order} = useSelector((state) => state.order)

    useEffect(() => {
       dispatch(getOrder(id))
     }, [dispatch, id])
  
  
   return (
    <section>
       <div className='container'>
          <h2>Order Details</h2>
          <div>
            <Link to="/order-history">&larr; Back To Orders</Link>
          </div>
          <br />
          <div className='table'>
             {
              isLoading && order === null ? (
                <Spinner />
              ) : (
                <>
                  <p>
                    <b>Ship to: </b> {order?.shippingAddress?.name}
                  </p>
                  <p>
                    <b>Order ID: </b> {order?._id}
                  </p>
                  <p>
                    <b>Order Amount: </b> {order?.orderAmount}
                  </p>
                  <p>
                    <b>Coupon:</b> {order?.coupon.name} | {order?.coupon?.discount}%
                  </p>
                  <p>
                    <b>Payment Method: </b> {order?.paymentMethod} 
                  </p>
                  <p>
                    <b>Order Status:</b> {order?.orderStatus} 
                  </p>
                  <p>
                    <b>Shipping Address:</b> 
                    <br /> 
                    Address: {order?.shippingAddress.line1},
                    {order?.shippingAddress.line2}, {order?.shippingAddress.city}
                    <br /> 
                     State: {order?.shippingAddress.state}
                    <br />
                    Country: {order?.shippingAddress.country}
                  </p>
                </>
              )
             }
          </div>
       </div>
    </section>
  )
}

export default OrderDetails