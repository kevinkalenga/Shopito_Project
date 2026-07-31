import React, { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { getCoupons } from '../../../redux/features/coupon/couponSlice';
import Loader from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import './Coupon.scss'

const CouponList = () => {
   const dispatch = useDispatch();
    const { isLoading, coupons = [] } = useSelector((state) => state.coupon);
    console.log(coupons)

   useEffect(() => {
     dispatch(getCoupons())
   }, [dispatch])

   
  
  
  
  
   return (
     <>
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>All Coupons</h3>

        <div className="table">
          {coupons.length === 0 ? (
            <p>No Coupon Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Discount(%)</th>
                  <th>Date Created</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {coupons.map((coupon, index) => (
                  <tr key={coupon._id}>
                    <td>{index + 1}</td>

                    <td>{coupon.name}</td>

                    <td>{coupon.discount}</td>

                    <td>{new Date(coupon.createdAt).toLocaleDateString()}</td>
                    
                    <td>{new Date(coupon.expiresAt).toLocaleDateString()}</td>
                    
                  

                    <td>
                      <FaEdit
                        size={20}
                        color="green"
                        className='icon edit'
                        // onClick={() => editBrand(brand)}
                      />

                      <FaTrashAlt
                        size={20}
                        color="red"
                        className='icon delete'
                        // onClick={() => confirmDelete(brand.slug)}
                      />
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default CouponList