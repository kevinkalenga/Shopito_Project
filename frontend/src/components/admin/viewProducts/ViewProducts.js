import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct, getProducts} from "../../../redux/features/product/productSlice"
import Search from '../../search/Search';
import { Spinner } from '../../loader/Loader';
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {Link} from "react-router-dom"
import { shortenText } from '../../../utils';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


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

  
    const confirmDelete = (id) => {
      confirmAlert({
        title: "Delete Product",
        message: "Are you sure you want to delete this product?",
        buttons: [
          {
            label: "Delete",
            onClick: () => delProduct(id),
          },
          {
            label: "Cancel",
          },
        ],
      });
    };
  
  
  const delProduct = async (id) => {
    await dispatch(deleteProduct(id))
     dispatch(getProducts())
  }
  
  
  // Begin Paginate 
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
 
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  
  
  
  
  
  
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
                        currentItems.map((product, index) => {
                          const {_id, name, category, price, quantity} = product
                          return (
                            <tr key={_id}>
                              <td>{itemOffset + index + 1}</td>
                              <td>{shortenText(name, 16)}</td>
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
                                  <Link to={`/admin/edit-product/${_id}`}>
                                    <FaEdit size={20} color={"green"} />
                                  </Link>
                                </span>
                                <span>
                                 
                                    <FaTrashAlt size={20} color={"red"} onClick={() => confirmDelete(_id)} />
                                
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
         
          <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="activePage"
          />
       
       
       </div>
    </section>
  )
}

export default ViewProducts