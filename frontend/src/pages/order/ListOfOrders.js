import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getOrders} from "../../redux/features/order/orderSlice"
import Loader from '../../components/loader/Loader'
import './OrderHistory.scss'

const ListOfOrders = ({openOrderDetails}) => {
  
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const {isLoading, orders} = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch])
  
//   const openOrderDetails = (id) => {
//      navigate(`/order-details/${id}`)
//   }
  
  
  
  return (
   
           <>
            {
              isLoading && <Loader />
            }
            <div className='table'>
                {
                  orders.length === 0 ? (
                     <p>No order found</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>s/n</th>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Order Amount</th>
                          <th>Order Status</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orders.map((order, index) => {
                            const {_id, orderDate, orderTime, orderAmount, orderStatus} = order 

                            return (
                              <tr key={_id}>
                                  <td>{index + 1}</td>
                                  <td>{orderDate} at {orderTime}</td>
                                  <td onClick={() => openOrderDetails(_id)}>{_id}</td>
                                  <td>${orderAmount}</td>
                                  <td>
                                    <p className={orderStatus !== "Delivered" ? "pending" : "delivered"}>
                                      {
                                        orderStatus
                                      }
                                    </p>
                                  </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  )
                }
            </div>
           </>
    
  )
}

export default ListOfOrders;