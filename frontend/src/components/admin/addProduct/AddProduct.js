import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../loader/Loader';
import {useNavigate} from 'react-router-dom';
import ProductForm from '../productForm/ProductForm';
//import ProductForm from '../productForm/productForm';
import "./AddProduct.scss";
import { getCategories, getBrands } from '../../../redux/features/categoryAndbrand/categoryAndbrandSlice';
import { createProduct } from '../../../redux/features/product/productSlice';
import {toast} from 'react-toastify'

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
  const navigate = useNavigate();
  const [filteredBrands, setFilteredBrands] = useState([])
  const [product, setProduct] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const {name, category, brand, quantity, color, price, regularPrice} = product
  const {isLoading} = useSelector((state) => state.product)
  // from mongodb
  const {categories} = useSelector((state) => state.category);
  const {brands} = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getCategories());
     dispatch(getBrands());
  }, [dispatch])

  // Filter Brands based on selected category 

  useEffect(() => {
  if (!category) {
    setFilteredBrands([]);
    return;
  }

  const newBrands = brands.filter(
    (brand) => brand.category === category
  );

  setFilteredBrands(newBrands);
}, [category, brands])

//   const filterBrands = (selectedCategory) => {
     
//       if (!selectedCategory) {
//          setFilteredBrands([]);
//          return;
//       }
   
//      const newBrands = brands.filter((brand) => brand.category === selectedCategory)
     
//      setFilteredBrands(newBrands)
//   }

//   useEffect(() => {
//      filterBrands(category)
//   }, [category, brands])
  


  const handleInputChange = (e) => {
     const {name, value} = e.target; 
     setProduct({...product, [name]: value})
  }

  const generateSKU = (category) => {
     const letter = category.slice(0, 3).toUpperCase();
     const number = Date.now();
     const sku = letter + "-" + number;
     return sku;
  }

  const saveProduct = async (e) => {
     e.preventDefault()
      
      if(files.length < 1) {
         return toast.error("Please add an image")
      }
      
      const formData = {
        name,
        sku: generateSKU(category),
        category,
        brand,
        color,
        quantity: Number(quantity),
        regularPrice,
        price,
        description,
        image: files
      }

     //console.log(formData)
     await dispatch(createProduct(formData));

     navigate("/admin/all-poducts")
  }
  
  return (
    <section>
       <div className='container'>
          {isLoading && <Loader />}
          <h3 className='--mt'>Add New Product</h3>

          <ProductForm 
            saveProduct={saveProduct}
            product={product} 
            handleInputChange={handleInputChange} 
            categories={categories} 
            brands={brands} isEditing={false}
            filteredBrands={filteredBrands} 
            description={description}
            setDescription={setDescription}
            files={files}
            setFiles={setFiles}
         />
       </div>
    </section>
  )
}

export default AddProduct