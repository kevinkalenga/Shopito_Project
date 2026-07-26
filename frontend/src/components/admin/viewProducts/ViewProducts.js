import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../../../redux/features/product/productSlice"
import Search from '../../search/Search';
import { Spinner } from '../../loader/Loader';
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {Link} from "react-router-dom"

const ViewProducts = () => {
  
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
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
                <Search value={search} onChange={(e) => setSearch(e.target.value)}  />
              </span>
            </div>
         </div>
         {
           isLoading && <Spinner />
         }
         <div className='table'>
            {
              !isLoading && products.length === 0 ? (
                <p>-- No Product Found...</p>
              ):(
                <table>
                   <thead>
                     <tr>
                      <td>s/n</td>
                      <td>Name</td>
                      <td>Category</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>Value</td>
                      <td>Action</td>
                      
                     </tr>
                   </thead>
                   <tbody>
                      {
                        products.map((product, index) => {
                          const {_id, name, category, price, quantity} = product
                          return (
                            <tr key={_id}>
                              <td>{index + 1}</td>
                              <td>{name}</td>
                              <td>{category}</td>
                              <td>{"$"}{price}</td>
                              <td>{quantity}</td>
                              <td>{"$"}{price * quantity}</td>
                              <td className='icons'>
                                <span>
                                  <Link to="/">
                                     <AiOutlineEye size={25} color={"purple"} />
                                  </Link>
                                </span>
                                <span>
                                  <Link to="/">
                                    <FaEdit size={20} color={"green"} />
                                  </Link>
                                </span>
                                <span>
                                 
                                    <FaTrashAlt size={20} color={"red"} />
                                
                                </span>
                              </td>
                            </tr>
                          )
                        })
                      }
                   </tbody>
                </table>
              )
            }
         </div>
       </div>
    </section>
  )
}

export default ViewProducts