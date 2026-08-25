import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
} from "../../redux/features/product/productSlice";

const ReviewProduct = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [rate, setRate] = useState(0);
    const [userReview, setUserReview] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const { isLoading, product } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);

     useEffect(() => {
        dispatch(getProduct(id));
      }, [dispatch]);

      console.log(product)
  
  
  return (
    <div>ReviewProduct</div>
  )
}

export default ReviewProduct


