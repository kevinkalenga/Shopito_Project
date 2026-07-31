import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Card from '../../card/Card'
import DatePicker from "react-datepicker";
import Loader from '../../loader/Loader'


const CreateCoupon = () => {
   const [name, setName] = useState("")
   const [discount, setDiscount] = useState(0)
   const [expiresAt, setExpiresAt] = useState(new Date())

   const {isLoading} = useSelector((state) => state.category)
   const dispatch = useDispatch()
   
   
   const saveCoupon = async(e) => {
      e.preventDefault() 

  

     
   }
  
  
  
  return (
    <>
      {isLoading && <Loader />}
      <div className='--mb2'>
         <h3>Create Coupon</h3>
         <p>
            Use the form to <b>Create a Coupon.</b>
         </p>
         <Card cardClass={"card"}>
            <br /> 
            <form onSubmit={saveCoupon}>
              <label>Coupon Name:</label> 
              <input 
                type="text" 
                placeholder='Coupon name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Coupon Discount:</label> 
              <input 
                type="number" 
                placeholder='Coupon discount'
                name='discount'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
              <label>Expiry Date :</label> 
              <DatePicker 
                selected={expiresAt}
                value={expiresAt}
                onChange={(date) => setExpiresAt(date)}
                required
              />
              <div className='--my'>
                 <button type="submit" className='--btn --btn-primary'>
                   Save Coupon
                 </button>
              </div>
            </form>
         </Card>
      </div>
    
    </>
  )
}

export default CreateCoupon