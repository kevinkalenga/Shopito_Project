import React from 'react';
import "./ProductForm.scss"
import Card from '../../card/Card';

const productForm = ({saveProduct, product, handleInputChange, categories, brands, isEditing,}) => {
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