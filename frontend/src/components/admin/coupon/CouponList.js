import React, { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { getCoupons } from '../../../redux/features/coupon/couponSlice';
import Loader from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import './Coupon.scss'
import { useNavigate } from "react-router-dom";
import { deleteCoupon } from "../../../redux/features/coupon/couponSlice";

const CouponList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  
    const { isLoading, coupons = [] } = useSelector((state) => state.coupon);
    // console.log(coupons)

   useEffect(() => {
     dispatch(getCoupons());
    
   }, [dispatch])

   
    const editCoupon = (coupon) => {
      navigate(`/admin/edit-coupon/${coupon._id}`);
    };
  
    const confirmDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this coupon?")){
        dispatch(deleteCoupon(id));
      }
    };
  
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

                    <td>{new Date(coupon.createdAt).toLocaleDateString("en-US")}</td>
                    
                    <td>{new Date(coupon.expiresAt).toLocaleDateString("en-US")}</td>
                    
                  

                    <td>
                      <FaEdit
                        size={20}
                        color="green"
                        className='icon edit'
                         onClick={() => editCoupon(coupon)}
                        
                      />

                      <FaTrashAlt
                        size={20}
                        color="red"
                        className='icon delete'
                         onClick={() => confirmDelete(coupon._id)}
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