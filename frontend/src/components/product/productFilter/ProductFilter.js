import React, { useState } from 'react'
import {useSelector} from "react-redux"
import styles from "./ProductFilter.module.scss"

const ProductFilter = () => {
  
  const {products, minPrice, maxPrice} = useSelector((state) => state.product)

  const [category, setCategory] = useState("All")
  
  const allCategories = [
    "All",
    ...new Set(products?.map((product) => product.category))
  ]
  //console.log(allCategories)

  const filterProductCategory = (cat) => {
     console.log(cat)
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