import React, { useEffect, useState } from 'react'
import styles from "./Product.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductFilter from '../../components/product/productFilter/ProductFilter';
import ProductList from '../../components/product/productList/ProductList';

const Product = () => {
  const dispatch = useDispatch()
  const [showFilter, setShowFilter] = useState(false);
  const {isLoading, products} = useSelector((state) => state.product)



  useEffect(() => {
    
      dispatch(getProducts())
  
  }, [dispatch])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }
  
  return (
    <section>
        <div className={`container ${styles.product}`}>
          <aside>
            <ProductFilter />
          </aside>
          <div className={styles.content}>
            <ProductList />
          </div>
        </div>
    </section>
  )
}

export default Product