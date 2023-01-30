import React from 'react'
import IndividualCartProduct from './IndividualCartProduct'

const CartProducts = (props) => {
    console.log("cart product comp", props.cartProducts);

    const cartProductIncrease = (data) => {
        props.cartProductIncrease(data);
    }

    const cartProductDecrease = (data) => {
        props.cartProductDecrease(data);
    }

    return (

        <div>
        {/* <IndividualCartProduct/> */}
            {props.cartProducts.map((cp)=> {
                return(
                <IndividualCartProduct key = {cp.ID} cartProduct = {cp} cartProductIncrease = {cartProductIncrease} cartProductDecrease={cartProductDecrease}/>
                )
            })}
        </div>        
            // props.cartProducts.map((cartProducts) => {
                // <IndividualCartProduct key={cartProducts.ID} cartProducts={props.cartProducts} />
            // })
    )
}

export default CartProducts