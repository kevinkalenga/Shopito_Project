import React from 'react'
import styles from "./Admin.module.scss"
import Navbar from '../../components/admin/navbar/Navbar'
import AdminHome from '../../components/admin/AdminHome/AdminHome'
import { Routes, Route } from 'react-router-dom'
import Category from '../../components/admin/category/Category'
import EditCategory from '../../components/admin/category/EditCategory'
import Brand from '../../components/admin/brand/Brand'
import EditBrand from '../../components/admin/brand/EditBrand'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import EditProduct from '../../components/admin/editProduct/EditProduct'
import Coupon from '../../components/admin/coupon/Coupon'


const Admin = () => {
  return (
    <div className={styles.admin}>
       <div className={styles.navbar}>
          <Navbar />
       </div>
       <div className={styles.content}>
         
          <Routes>
            <Route path="home" element={<AdminHome />} />
            <Route path="category" element={<Category />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="brand" element={<Brand />} />
            <Route path="brand/edit/:id" element={<EditBrand />} />
            <Route path="add-product" element={<AddProduct/>} />
            <Route path="all-products" element={<ViewProducts/>} />
            <Route path="coupon" element={<Coupon/>} />
            <Route path="edit-product/:id" element={<EditProduct/>} />
           
          </Routes>
       </div>
    </div>
  )
}

export default Admin