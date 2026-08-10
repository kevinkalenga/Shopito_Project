import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import "./Home.scss"
import HomeInfoBox from './HomeInfoBox'
import { productData } from '../../components/carousel/data'
import CarouselItem from '../../components/carousel/CarouselItem'
import ProductCarousel from '../../components/carousel/Carousel'
import ProductCategory from './ProductCategory'
import FooterLinks from '../../components/footer/FooterLinks'
import {useDispatch, useSelector} from "react-redux"
import { getProducts } from '../../redux/features/product/productSlice'

const PageHeading = ({heading, btnText}) => {
  return (
    <>
     <div className='--flex-between'>
        <h2 className='--fw-thin'>{heading}</h2>
        <button className='--btn'>
           {btnText}
        </button>
     </div>
     <div className='--hr'></div>
    </>
  )
}

const Home = () => {
  
   const dispatch = useDispatch();
   const {products} = useSelector((state) => state.product)

   const latest = products?.filter((product) => {
     return product.quantity > 0
   })?.filter((product, index) => index < 7)
   
   const phones = products
   ?.filter((product) => {
     return product.quantity > 0
   })
   ?.filter((product) => {
     return product.category === "phone"
   })
   ?.filter((product, index) => index < 7)

   useEffect(() => {
     dispatch(getProducts())
   }, [dispatch])
  
  
  const latestProducts = latest.map((item) => (
    <div key={item.id}>
       <CarouselItem 
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
       />
    </div>
  ))
  const phoneProducts = phones.map((item) => (
    <div key={item.id}>
       <CarouselItem 
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
       />
    </div>
  ))
  // const productss = productData.map((item) => (
  //   <div key={item.id}>
  //      <CarouselItem 
  //       name={item.name}
  //       url={item.imageurl}
  //       price={item.price}
  //       description={item.description}
  //      />
  //   </div>
  // ))
  
  return (
    <>
      <Slider />  
      <section>
          <div className='container'>
            <HomeInfoBox />
            <PageHeading heading={"Latest Products"} btnText={"Shop Now>>>"}/>
            <ProductCarousel products={latestProducts} />
          </div>
      </section> 
      <section className='--bg-grey'>
          <div className='container'>
             <h3>Categories</h3>
             <ProductCategory />
          </div>
      </section> 
      <section>
          <div className='container'>
           
            <PageHeading heading={"Mobile Phones"} btnText={"Shop Now>>>"}/>
            <ProductCarousel products={phoneProducts} />
          </div>
      </section> 
      <FooterLinks />
    </>
  )
}

export default Home