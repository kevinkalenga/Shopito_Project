import React from 'react';
import "./ProductForm.scss"
import Card from '../../card/Card';

const productForm = ({saveProduct, product, handleInputChange}) => {
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
               value={product.name}
               onChange={handleInputChange}
             />
          </form>
       </Card>
    </div>
  )
}

export default productForm