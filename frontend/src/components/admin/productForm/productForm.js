import React from 'react';
import "./ProductForm.scss"
import Card from '../../card/Card';

const productForm = ({saveProduct, product, handleInputChange, categories, brands, isEditing, filteredBrands}) => {
  return (
    <div className='add-product'>
       <h3>Upload Widget Placeholder</h3>

       <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveProduct}>
             <label>Product Name:</label>
             <input 
               type="text"
               placeholder='Product name'
               name='name'
               value={product?.name}
               onChange={handleInputChange}
             />
             <label>Product Category:</label>
              <select name="category" value={product?.category} onChange={handleInputChange}>
                 {isEditing ? (
                   <option value={product?.category}>{product?.category}</option>
                 ):(
                  <option>Select Category</option>
                 )}
                 {categories.length > 0 && categories.map((cat) => (
                   <option value={cat.name} key={cat._id}>{cat.name}</option>
                 ))}
              </select>

               
              <label>Product Brands:</label>
              <select name="brand" value={product?.brand} onChange={handleInputChange}>
                 {isEditing ? (
                   <option value={product?.brand}>{product?.brand}</option>
                 ):(
                  <option>Select Brand</option>
                 )}
                 {filteredBrands.length > 0 && filteredBrands.map((brand) => (
                   <option value={brand.name} key={brand._id}>{brand.name}</option>
                 ))}
              </select>
              
              
              
              <div className='--my'>
                 <button type="submit" className='--btn --btn-primary'>
                   Save Product
                 </button>
              </div>
          </form>
       </Card>
    </div>
  )
}

export default productForm