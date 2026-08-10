import React, { useState } from 'react'
import "./VerifyCoupon.scss"
import {useDispatch, useSelector} from "react-redux"

const VerifyCoupon = () => {
  const dispatch = useDispatch()
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const {coupon} = useSelector((state) => state.coupon)

  const {cartTotalAmount, fixedCartTotalAmount} = useSelector((state) => state.cart)

  const verifyCoupon = () => {
    
  }
  const removeCoupon = () => {
    
  }
  
  
  return (
    <>
      <div className='--flex-between'>
          <p>Have a coupon ?</p>
          {
            coupon === null ? (
                <p className='--cursor --color-primary' onClick={() => setShowForm(true)}>
                 <b>Add Coupon</b>
                </p>
            ) : (
               <p className='--cursor --color-primary' onClick={removeCoupon}>
                  <b>Remove Coupon</b>
              </p>
            )
          }
         
      </div>
      {
        showForm && (
          <form onSubmit={verifyCoupon} className='coupon-form --form-control'>
             <input 
               type='text'
               placeholder='Coupon name'
               name='name'
               value={couponName}
               onChange={(e) => setCouponName(e.target.value.toUpperCase())}
               required
             />
             <button type='submit' className='--btn --btn-primary'>
               Verify
             </button>
          </form>
        )
      }
    </>
  )
}

export default VerifyCoupon