import React from 'react'
import CreateCategory from './CreateCategory'
import CategoryList from './CategoryList'
import './Category.scss'

const Category = () => {
  return (
    <section>
        <div className='container coupon'>
            <CreateCategory />
            <CategoryList />
        </div>
    </section>
  )
}

export default Category