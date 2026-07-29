import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getProduct, updateProduct } from '../../../redux/features/product/productSlice';
import { getCategories, getBrands } from '../../../redux/features/categoryAndbrand/categoryAndbrandSlice';
import {toast} from 'react-toastify'

const EditProduct = () => {
  
  const {id} = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {product:productEdit, isLoading, message} = useSelector((state) => state.product);
   // from mongodb
    const {categories} = useSelector((state) => state.category);
    const {brands} = useSelector((state) => state.brand);
  
  console.log(productEdit)
  
  const [filteredBrands, setFilteredBrands] = useState([])
  const [product, setProduct] = useState(productEdit);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
     dispatch(getProduct(id));
  }, [dispatch, id])

  useEffect(() => {
     if (productEdit) {
        setProduct(productEdit);
        setDescription(productEdit.description);
     }
  }, [productEdit]);

  useEffect(() => {
      dispatch(getCategories());
      dispatch(getBrands());
  }, [dispatch])

   // Filter Brands based on selected category 

  const filterBrands = (selectedCategory) => {
     
      if (!selectedCategory) {
         setFilteredBrands([]);
         return;
      }
   
     const newBrands = brands.filter((brand) => brand.category === selectedCategory)
     
     setFilteredBrands(newBrands)
  }
  
  useEffect(() => {
       filterBrands(product?.category)
  }, [product?.category])
 
  const handleInputChange = (e) => {
     const {name, value} = e.target; 
     setProduct({...product, [name]: value})
  }
 
  const saveProduct = async (e) => {
        e.preventDefault()
         
         if(files.length < 1) {
            return toast.error("Please update an image")
         }
         
         const formData = {
           name:product.name,
           category:product.category,
           brand:product.brand,
           color:product.color,
           quantity: Number(product.quantity),
           regularPrice:product.regularPrice,
           price:product.price,
           description,
           image: files
         }
   
        //console.log(formData)
        await dispatch(updateProduct({id,formData}));
   
        navigate("/admin/all-poducts")
     } 
  
  
  return (
    <div>{id}</div>
  )
}

export default EditProduct