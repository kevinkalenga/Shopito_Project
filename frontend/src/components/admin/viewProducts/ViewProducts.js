import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../../../redux/features/product/productSlice"
import Search from '../../search/Search';

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
    <section>
       <div className='container product-list'>
         <div className='table'>
            <div className='--flex-between --flex-dir-column'>
              <span>
                <h3>All Products</h3>
                <p>
                  ~ <b>{products.length}</b> Products found
                </p>
              </span>
              <span>
                <Search  />
              </span>
            </div>
         </div>

       </div>
    </section>
  )
}

export default ViewProducts