import React from 'react'
import styles from "./Cart.module.scss"
import "./Radio.scss"
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { ADD_TO_CART, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems } from '../../redux/features/cart/cartSlice';
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const cartItems = useSelector(selectCartItems)
  
  const increaseCart = (product) => {
     dispatch(ADD_TO_CART(product))
  }
  const decreaseCart = (product) => {
     dispatch(DECREASE_CART(product))
  }
  const removeFromCart = (product) => {
     dispatch(REMOVE_FROM_CART(product))
  }
  const clearCart = () => {
     dispatch(CLEAR_CART())
  }
  
 
 
  
  
  
  return (
    <section>
        <div className={`container ${styles.table}`}>
            <h2>Shopping Cart</h2>
            {
              cartItems?.length === 0 ? (
                 <>
                    <p>Your cart is empty.</p>
                    <div>
                      <Link to="/shop">&larr; Continue Shopping</Link>
                    </div>
                 </>
              ) : (
                  <>
                    <table>
                      <thead>
                        <tr>
                           <th>s/n</th>
                           <th>Product</th>
                           <th>Price</th>
                           <th>Quantity</th>
                           <th>Total</th>
                           <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartItems?.map((cart, index) => {
                            const {_id, name, price, image, cartQuantity} = cart
                            return(
                              <tr key={_id}>
                                 <td>{index + 1}</td>
                                 <td>
                                   <p><b>{name}</b></p>
                                    <Link to={`/product-details/${_id}`}>
                                      <img src={image[0]} alt={name} style={{width:"100px"}}/>
                                    </Link>
                                 </td>
                                 <td>${price}</td>
                                 <td>
                                     <div className={styles.count}>
                                       
                                  
                                          <>
                                            <button className='--btn' onClick={() => decreaseCart(cart)}>
                                              -
                                            </button>
                                            <p>
                                              <b>{cart.cartQuantity}</b>
                                            </p>
                                            <button className='--btn' onClick={() => increaseCart(cart)}>
                                              +
                                            </button>
                                          </>
                                  
                                       
                                      </div>
                                 </td>
                                 <td>{price * cartQuantity}</td>
                                 <td>
                                   <div className={styles.icons}>
                                         <FaTrashAlt size={20} color={"red"} onClick={() => removeFromCart(cart)} />
                                   </div>
                                 </td>
                                
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                    <div className={styles.summary}>
                       <button className='--btn --btn-danger' onClick={clearCart}>Clear Cart</button>
                       <div className={styles.checkout}>
                          <Link to={"/shop"}>&larr; Continue Shopping</Link>
                       </div>
                    </div>
                  </>
              )
            }
        </div>
    </section>
  )
}

export default Cart