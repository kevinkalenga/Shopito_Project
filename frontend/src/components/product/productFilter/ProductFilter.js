import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import styles from "./ProductFilter.module.scss"
import { FILTER_BY_CATEGORY } from '../../../redux/features/product/filterSlice';

const ProductFilter = () => {
  const dispatch = useDispatch()
  const {products, minPrice, maxPrice} = useSelector((state) => state.product)

  const [category, setCategory] = useState("All")
  
  const allCategories = [
    "All",
    ...new Set(products?.map((product) => product.category))
  ]
  //console.log(allCategories)

  useEffect(() => {
     dispatch(FILTER_BY_CATEGORY({ products, category }));
  }, [dispatch, products, category]);

  const filterProductCategory = (cat) => {
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({products:products, category:cat}))
    //console.log(cat)
  }
  
  return (
    <div className={styles.filter}>
        <h4>Categories</h4>
          <div className={styles.category}>
            {
              allCategories.map((cat, index) => {
                return (
                  <button 
                    key={index}
                    type='button'
                    className={`${category}` === cat ? `${styles.active}` : null}
                     
                      onClick={() => filterProductCategory(cat)}
                    >
                    &#8250; {cat}
                  </button>
                )
              })
            }
          </div>
    </div>
  )
}

export default ProductFilter