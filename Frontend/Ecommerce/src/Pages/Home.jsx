import React from 'react'
import Slider from './Slider'
import ProductListing from './Product'
import Category from './Category'
// import Electronics from './Electronics'
// import Beauty from './Beauty'
// // import Footer from '../Componets/Footer'
// // import Electronics from './Electronics'
 

const Home = () => {
  return (
    <div>
      <Slider/>
      <Category/>
      <ProductListing/>
      {/* <Electronics/>
      <Beauty/> */}
    </div>
  )
}

export default Home
