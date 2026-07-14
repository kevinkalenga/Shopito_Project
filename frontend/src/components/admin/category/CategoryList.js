import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getCategories, deleteCategory } from '../../../redux/features/categoryAndbrand/categoryAndbrandSlice'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from '../../loader/Loader'
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



const CategoryList = () => {

   const {isLoading, categories} = useSelector((state) => state.category)
   const dispatch = useDispatch() 
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(getCategories())
   }, [dispatch])
  
  
      const editCategory = (category) => {
          navigate(`/admin/category/edit/${category._id}`);
      }
   
   
    const confirmDelete = (slug) => {
      confirmAlert({
        title: "Delete Category",
        message: "Are you sure you want to delete this category?",
        buttons: [
          {
            label: "Delete",
            onClick: () => dispatch(deleteCategory(slug))
          },
          {
            label: "Cancel",
            onClick: () => {}
          }
        ]
      });
    };
   
   
   
  return (
    <>
      {isLoading && <Loader />}
      <div className='--mb2'>
        <h3>All Categories</h3>
        <div className='table'>
          {
            categories.length === 0 ? (
                <p>No Category Found</p>
            ):(
              <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((cat, index) => {
                        const {_id, name, slug} = cat
                        return(
                          <tr key={_id}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>
                              <span>
                                  <FaEdit
                                    size={20}
                                    color="green"
                                    style={{ cursor: "pointer", marginRight: "10px" }}
                                    onClick={() => editCategory(cat)}
                                  />
                              </span>
                              
                              
                              <span>
                                <FaTrashAlt size={20} color={"red"} onClick={()=>confirmDelete(slug)} />
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
    </>
  )
}

export default CategoryList