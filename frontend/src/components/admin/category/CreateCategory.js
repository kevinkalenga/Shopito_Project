import React, { useState } from 'react'
import Card from '../../card/Card'

const CreateCategory = () => {
  
   const [name, setName] = useState("")
   
   
   const saveCategory = (e) => {
    
   }
  
  
  
  return (
    <>
      <div className='--mb2'>
         <h3>Create Category</h3>
         <p>
            Use the form to <b>Create a Category.</b>
         </p>
         <Card cardClass={"card"}>
            <br /> 
            <form onSubmit={saveCategory}>
              <label>Category Name:</label> 
              <input 
                type="text" 
                placeholder='Category name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className='--my'>
                 <button type="submit" className='--btn --btn-primary'>
                   Save Category
                 </button>
              </div>
            </form>
         </Card>
      </div>
    
    </>
  )
}

export default CreateCategory