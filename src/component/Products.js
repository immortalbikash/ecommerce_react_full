import React, { useState } from 'react'
import IndividualProduct from './IndividualProduct'

const Products = (props) => {

  const addToCart = (data)=> {
    props.addToCart(data);
    // receiving data from individual product and sending it to home
  }

  return (
    <div className='container-fluid cont'>
      {props.product.map((individualProduct)=> (
        <IndividualProduct key={individualProduct.ID} individualProduct = {individualProduct} addToCart = {addToCart}  />
      ))}
    </div>
  )
}

export default Products