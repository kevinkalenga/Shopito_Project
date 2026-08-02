import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../card/Card";
import DatePicker from "react-datepicker";
import Loader from "../../loader/Loader";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { updateCoupon, getCoupon } from "../../../redux/features/coupon/couponSlice";
import './Coupon.scss'


const EditCoupon = () => {
  const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());

  const { isLoading, coupon } = useSelector(
    (state) => state.coupon
  );

 
  useEffect(() => {
     dispatch(getCoupon(id));
  }, [dispatch, id]);


  // Charger les données du coupon
  useEffect(() => {
    if (coupon) {
      setName(coupon.name);
      setDiscount(coupon.discount);
      setExpiresAt(new Date(coupon.expiresAt));
    }
  }, [coupon]);


  const saveCoupon = async (e) => {
    e.preventDefault();


    if (name.length < 5) {
      return toast.error("Coupon must be up to 5 characters");
    }

    if (discount < 1) {
      return toast.error("Discount must be greater than one");
    }


    const couponData = {
      name,
      discount,
      expiresAt
    };


    const result = await dispatch(
      updateCoupon({
        id,
        formData :couponData
      })
    );


    if (updateCoupon.fulfilled.match(result)) {
      toast.success("Coupon updated successfully");
      navigate("/admin/coupon");
    }

  };


  return (
    <>
      {isLoading && <Loader />}

      <div className="--mb2">

        <h3>Edit Coupon</h3>

        <Card cardClass="card">

          <form onSubmit={saveCoupon}>

            <label>Coupon Name:</label>

            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />


            <label>Coupon Discount:</label>

            <input
              type="number"
              value={discount}
              onChange={(e)=>setDiscount(Number(e.target.value))}
              required
            />


            <label>Expiry Date:</label>

            <DatePicker
              selected={expiresAt}
              onChange={(date)=>setExpiresAt(date)}
              required
            />


            <div className="--my">

              <button 
                type="submit"
                className="--btn --btn-primary"
              >
                Update Coupon
              </button>

            </div>


          </form>

        </Card>

      </div>

    </>
  );
};


export default EditCoupon;