import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss"
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import {useDispatch, useSelector} from "react-redux"
import { FILTER_BY_SEARCH, selecteFilteredProducts, SORT_PRODUCTS } from '../../../redux/features/product/filterSlice';

const ProductList = ({products}) => {
  const dispatch = useDispatch()
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("latest")
  
  const filteredProducts = useSelector(selecteFilteredProducts)

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort}))
  }, [dispatch, products, sort])
  
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [dispatch, products, search])

  
  
  return (
    <div className={styles["product-list"]}>
       <div className={styles.top}>
         <div className={styles.icons}>
            <BsFillGridFill 
             size={22} 
             color="orangered"
            onClick={() => setGrid(true)}
            />
            <FaListAlt 
             size={24} 
             color="#0066d4"
              onClick={() => setGrid(false)}
            />
            <p>
              <strong>{products.length} Products found</strong>
            </p>
         </div>
         <div>
           <Search  value={search} onChange={(e) => setSearch(e.target.value)}/>
         </div>
         <div className={styles.sort}>
            <label>Sort by:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
             
            </select>
         </div>
       </div>
       <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {
            products.length === 0 ? (
              <p>Product Not Found</p>
            ) : (
              <>
                {
                  filteredProducts?.map((product) => {
                    return (
                      <div key={product._id}>
                          <ProductItem {...product} grid={grid} product={product}/>
                      </div>
                    )
                  })
                }
              </>
            )
          }
       </div>
    </div>
  )
}

export default ProductList;