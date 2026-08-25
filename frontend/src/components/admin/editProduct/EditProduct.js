import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct } from '../../../redux/features/product/productSlice';
import { getCategories, getBrands } from '../../../redux/features/categoryAndbrand/categoryAndbrandSlice';
import { toast } from 'react-toastify';
// import ProductForm from '../productForm/ProductForm';
import ProductForm from '../productForm/productForm';
import Loader from '../../loader/Loader';

const EditProduct = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product: productEdit, isLoading } = useSelector(
    (state) => state.product
  );

  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");

  // Get product
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);


  // Fill form when product arrives
  useEffect(() => {
    if (productEdit) {
      setProduct(productEdit);
      setDescription(productEdit.description);
    }
  }, [productEdit]);


  // Get categories and brands
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);


  // Filter brands by category
  useEffect(() => {

    if (!product?.category || brands.length === 0) {
      setFilteredBrands([]);
      return;
    }

    const newBrands = brands.filter(
      (brand) => brand.category === product.category
    );

    setFilteredBrands(newBrands);

  }, [product?.category, brands]);


  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value
    });
  };


  const saveProduct = async (e) => {

    e.preventDefault();

    if (!product) return;


    const formData = {

      name: product.name,
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      price: product.price,
      description,

      // garde l'ancienne image si aucune nouvelle
      image: files.length > 0 ? files : product.image
    };


    const result = await dispatch(
      updateProduct({ id, formData })
    );


    if (updateProduct.fulfilled.match(result)) {
      toast.success("Product updated successfully");
      navigate("/admin/all-products");
    }

  };


  return (
    <section>
      <div className='container'>

        {isLoading && <Loader />}

        <h3 className='--mt'>Edit Product</h3>


        <ProductForm
          saveProduct={saveProduct}
          product={product}
          handleInputChange={handleInputChange}
          categories={categories}
          brands={brands}
          isEditing={true}
          filteredBrands={filteredBrands}
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
        />

      </div>
    </section>
  );
};

export default EditProduct;