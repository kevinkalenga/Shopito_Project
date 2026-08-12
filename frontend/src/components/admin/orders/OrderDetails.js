import React from 'react';
import { Link } from 'react-router-dom';
import OrderDetailsComps from '../../../pages/order/OrderDetailsComps';

const OrderDetails = () => {
  //<Link to="/admin/orders">&larr; Back To Orders</Link>
  return (
     <OrderDetailsComps orderPageLink={"/admin/orders"} />
  )
}

export default OrderDetails