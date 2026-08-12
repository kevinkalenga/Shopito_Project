import React, { useState } from 'react'
import styles from "./ChangeOrderStatus.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../../loader/Loader';
import Card from '../../card/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { updateOrderStatus } from '../../../redux/features/order/orderSlice';

const ChangeOrderStatus = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(id)
  const [status, setStatus] = useState("");
  const {isLoading} = useSelector((state) => state.order);

  const updateOrder = async (e, id) => {
    e.preventDefault()
    const formData = {
      orderStatus: status
    }
    // console.log(formData)
    dispatch(updateOrderStatus({id, formData}))
    navigate("/admin/orders")
  }
  
  return (
    <>
      {
        isLoading && <Spinner />
      }
      <div className={styles.status}>
          <Card cardClass={styles.card}>
            <h4>Update Status</h4>
            <form onSubmit={(e) => updateOrder(e, id)}>
               <span>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="" disabled>
                       -- Chose one --
                    </option>
                    <option value="Order Placed...">Order Placed</option>
                    <option value="Processing...">Processing</option>
                    <option value="Shipped...">Shipped...</option>
                    <option value="Delivered">Delivered</option>
                  </select>
               </span>
               <span>
                 <button type='submit' className='--btn --btn-primary'>
                    Update Status
                 </button>
               </span>
            </form>
          </Card>
      </div>
    </>
  )
}

export default ChangeOrderStatus;