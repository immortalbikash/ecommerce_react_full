import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { auth } from '../config/Config';
import { fs } from '../config/Config';
import CartProducts from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import './IndividualProduct.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const Cart = () => {

    const history = useNavigate()

    // show modal state
    const [showModal, setModalState] = useState(false);

    // trigger modal
    const triggerModal = () => {
        setModalState(true);
        // history('/modal');
        // console.log('cash on delivery clicked');

    }

    const ModalValue = (value) => {
        setModalState(value);
    }

    // get current user function
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('users').doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().Fullname)
                    })
                }
                else {
                    setUser(null)
                }
            })
        }, [])
        return user;
    }
    const user = GetCurrentUser();

    // state of cart products
    const [cartProducts, setCardProducts] = useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=> {
        auth.onAuthStateChanged(user=> {
            if(user){
                fs.collection('Cart ' +user.uid).onSnapshot(snapshot=> {
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCardProducts(newCartProduct);
                })
            }
            else{
                console.log('user is not signed to retrieve cart');
            }
        })
    }, [])

    // console.log("cart products are: ", cartProducts);

    // getting total quantities from cartProduct in seperate array
    const qty = cartProducts.map(cartProducts=> {
        return cartProducts.qty;
    })

    // redcing the qty in single value (adding all the qty)
    const redcerOfQty = (accumulator, currentValue) => accumulator + currentValue;

    const totalQty = qty.reduce(redcerOfQty , 0);

    // console.log(totalQty);


    // getting total product price from cartProducts in seperate arrray
    const price = cartProducts.map(cp=> {
        return cp.TotalProductPrice;
    })

    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

    const totalPrice = price.reduce(reducerOfPrice, 0)

    // global variable
    let Product;

    const cartProductIncrease = (cartProduct) => {
        // console.log("i clicked increment of ", data.title)
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.price;


        console.log("cart product id is ", cartProduct.ID)
        // updating in database
        auth.onAuthStateChanged(user => {
            if(user){
                console.log("Cart user id is ", user.uid)
                fs.collection('Cart ' +user.uid).doc(cartProduct.ID).update(Product).then(()=> {
                    console.log("increment added");
                }).catch((err)=> {
                    console.log(err.message);
                })
            }
            else{
                console.log('User is not logged in to increment');
            }
        })
    }

    const cartProductDecrease = (cartProduct) => {
        Product = cartProduct;
        Product.qty = Product.qty - 1;
        Product.TotalProductPrice = Product.qty * Product.price;

        auth.onAuthStateChanged(user => {
            if(user){
                if(Product.qty>0){
                    console.log("Cart user id is ", user.uid)
                    fs.collection('Cart ' +user.uid).doc(cartProduct.ID).update(Product).then(()=> {
                        console.log("Decrement added");
                    }).catch((err)=> {
                        console.log(err.message);
                })
                }
                else{
                    console.log("Product wont be less than 1")
                }
                
            }
            else{
                console.log('User is not logged in to increment');
            }
        })
    }

    // state of totalProducts
    const [totalProduct, setTotalProduct] = useState(0);
    // gettting cart Products
    useEffect(()=> {
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProduct(qty);
                })
            }
        })
    }, [])

  return (
    <div>
        <Navbar user = {user} totalProduct = {totalProduct}/>
        <br/>

        {cartProducts.length > 0 && (
            <div className='container-fluid'>
                <div className='text-center'><h2>My Cart</h2></div>
                <div className='product-box'>
                    <CartProducts cartProducts = {cartProducts} cartProductIncrease = {cartProductIncrease} cartProductDecrease = {cartProductDecrease}/>
                </div>

                <hr></hr>

                <div className='summary-box'>
                    <h5>Cart Summary</h5>
                    <hr></hr>
                    <br></br>
                    <div>
                    Total Number of Products: <span>{totalQty}</span>
                    </div>
                    <div>
                    Total pice to pay: <span>Rs {totalPrice}</span>
                    </div>
                    <br></br>
                    <StripeCheckout>
                    </StripeCheckout>
                    <p>or</p>
                    <button onClick={triggerModal} type="button" class="btn btn-success">Cash on Delivery</button>
                </div>
            </div>
        )}

        {cartProducts.length <1 && (
            <div className='container-fluid text-center bg-danger py-3'>
                <h3>Your cart is empty</h3>
            </div>
        )}

        {showModal && (
            <Modal totalPrice = {totalPrice} totalQty = {totalQty} modalValue={ModalValue}/>
        )}
    </div>
  )
}

export default Cart