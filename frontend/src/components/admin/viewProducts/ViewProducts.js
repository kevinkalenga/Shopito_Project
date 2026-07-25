import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../../../redux/features/product/productSlice"

const ViewProducts = () => {
  
  const dispatch = useDispatch();
  const { isLoggedIn} = useSelector((state) => state.auth);
  const {products, isLoading} = useSelector((state) => state.product);
  

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getProducts())
    }
  }, [isLoggedIn, dispatch])
  
  return (
    <div>viewProducts</div>
  )
}

export default ViewProducts