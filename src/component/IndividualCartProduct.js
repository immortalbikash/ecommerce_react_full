import React from 'react'
import './IndividualProduct.css'
import { auth } from '../config/Config'
import { fs } from '../config/Config'

const IndividualCartProduct = (props) => {
    console.log("cart in individual product ",props.cartProduct)

    const handleCartProductIncrease = ()=> {
        props.cartProductIncrease(props.cartProduct);
        console.log(props.cartProduct)
    }

    const handleCartProductDecrease = () => {
        props.cartProductDecrease(props.cartProduct)
    }

    const handleCartProductDelete = () => {
        // console.log("delete")
        auth.onAuthStateChanged(user => {
            if(user){
                fs.collection('Cart ' + user.uid).doc(props.cartProduct.ID).delete().then(()=> {
                    console.log("Cart deleted.")
                })
            }
        })
    }
  return (
    <div className='cart_products'>
        <div className='cart_product_img'>
            <img src={props.cartProduct.url}/>
        </div>
        <div className='cart_product_details'>
            <h5>{props.cartProduct.title}</h5>
            <p>{props.cartProduct.description}</p>
            <h5>Rs: {props.cartProduct.price}</h5>
        </div>
        <div className='cart_product_quantity'>
            <p><span><i class="bi bi-dash-lg" onClick={handleCartProductDecrease}></i></span>{props.cartProduct.qty}<span><i class="bi bi-plus-lg" onClick={handleCartProductIncrease}></i></span></p>
            <h5>Total Price Rs: {props.cartProduct.TotalProductPrice}</h5>
        </div>
        <div className='cart_delete'>
            <button className=' btn btn-danger' onClick={handleCartProductDelete}><i class="bi bi-trash3"></i> Delete</button>
        </div>
    </div>
  )
}

export default IndividualCartProduct