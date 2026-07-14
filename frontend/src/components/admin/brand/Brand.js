import React from 'react'
import CreateBrand from './CreateBrand'
import BrandList from './BrandList'
import './Brand.scss'

const Brand = () => {
  return (
      <section>
        <div className='container coupon'>
            <CreateBrand />
            <BrandList />
        </div>
    </section>
  )
}

export default Brand