import React from 'react'
import './IndividualProduct.css'
import Products from './Products'

const IndividualProduct = (props) => {
    // console.log(props.individualProduct)

    const handleAddToCart = () => {
        props.addToCart(props.individualProduct);
        // sendind data to product
    }
  return (
     <>

     <div className='container-fluid text-center individual_container my-2'>
     <div className='row'>
     <div className='column col-lg-3 grid'>
         <div className="card" style={{ width: '22rem' }}>
           <img src={props.individualProduct.url} className="card-img-top" alt="..." />
           <div className="card-body">
               <h5 className="card-title">{props.individualProduct.title}</h5>
               <p className="card-text">{props.individualProduct.description}</p>
               <p className="card-text">{props.individualProduct.price}</p>
               <a href="#" className="btn btn-danger" onClick={handleAddToCart}>ADD TO CART</a>
           </div>
           </div>
       </div>
       </div>
       </div>

       </>

    //   <div>




    // <div className='product col-lg-3'>
    //     <div className='product-image'>
    //         <img src={props.individualProduct.url}/>
    //     </div>
    //     <div className='product-text title'>{props.individualProduct.title}</div>
    //     <div className='product-text description'>{props.individualProduct.description}</div>
    //     <div className='product-text price'>{props.individualProduct.price}</div>
    //     {/* <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div> */}
    // </div>
  )
}

export default IndividualProduct