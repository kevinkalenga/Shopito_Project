import React from 'react';
import OrderDetailsComps from '../../../pages/order/OrderDetailsComps';
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus';

const OrderDetails = () => {
  //<Link to="/admin/orders">&larr; Back To Orders</Link>
  return (
      <>
        <OrderDetailsComps orderPageLink={"/admin/orders"} />
        <ChangeOrderStatus />
      </>
  )
}

export default OrderDetails