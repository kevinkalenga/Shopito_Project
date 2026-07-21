import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../loader/Loader';
import ProductForm from '../productForm/ProductForm';
import "./AddProduct.scss";
import { getCategories } from '../../../redux/features/categoryAndbrand/categoryAndbrandSlice';

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  color: "",
  price: "",
  regularPrice: "",
}

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const {name, category, brand, quantity, color, price, regularPrice} = product
  const {isLoading} = useSelector((state) => state.product)
  const {categories} = useSelector((state) => state.category);
  const {brands} = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleInputChange = (e) => {
     const {name, value} = e.target; 
     setProduct({...product, [name]: value})
  }

  const saveProduct = async (e) => {
     e.preventDefault()
     console.log(product)
  }
  
  return (
    <section>
       <div className='container'>
          {isLoading && <Loader />}
          <h3 className='--mt'>Add New Product</h3>

          <ProductForm 
            saveProduct={saveProduct}
            product={product} 
            handleInputChange={handleInputChange} categories={categories} brands={brands} isEditing={false} />
       </div>
    </section>
  )
}

export default AddProduct