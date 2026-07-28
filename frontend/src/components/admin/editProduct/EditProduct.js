import React, { useEffect } from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux"
import { getProduct } from '../../../redux/features/product/productSlice';

const EditProduct = () => {
  
  const {id} = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(getProduct(id));
  })
  
  return (
    <div>{id}</div>
  )
}

export default EditProduct