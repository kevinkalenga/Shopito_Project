import React from 'react'
import styles from "./ProductItem.module.scss"
import Card from '../../card/Card'
import {Link} from "react-router-dom"
import { shortenText } from '../../../utils'
import {toast} from 'react-toastify'
import DOMPurify from "dompurify"

const ProductItem = ({product, grid, _id, name, price, image, regularPrice}) => {
  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
       <Link to={`product-details/${_id}`}>
          <div className={styles.img}>
             <img src={image[0]} alt={name} />
          </div>
       </Link>
       <div className={styles.content}>
         <div className={styles.details}>
            <p>
              <span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>
              {` $${price}`}
            </p>
            <h4>Rating ***</h4>
            <h4>{shortenText(name, 18)}</h4>

            {
              !grid && (
                
                <div dangerouslySetInnerHTML={{
                   __html: DOMPurify.sanitize(product?.description || ""),
                  // __html: DOMPurify.sanitize(shortenText(product?.description, 200)),
                }}>

                </div>
              )
            }

            {
              product?.quantity > 0 ? (
                <button className='--btn --btn-primary'>
                   Add To Cart
                </button>
              ) : (
                 <button className='--btn --btn-red' onClick={() => toast.error("Sorry, Product is out of stock")}>
                   Out Of Stock
                </button>
              )
            }
         </div>
       </div>
    </Card>
  )
}

export default ProductItem