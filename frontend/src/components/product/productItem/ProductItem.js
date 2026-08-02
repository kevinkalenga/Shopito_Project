import React from 'react'
import styles from "./ProductItem.module.scss"

const ProductItem = ({name}) => {
  return (
    <div>
       <h3>{name}</h3> 
    </div>
  )
}

export default ProductItem