import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import { auth } from '../config/Config'
import { fs } from '../config/Config'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const history = useNavigate();

    // get current user uid
    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserUid();
    console.log("current user uid is ", uid)

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

    // state of products
    const [products, setProducts] = useState([]);

    //getting product in function
    const getProduct = async () => {
        const products = await fs.collection('Product').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

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


    let Product;
    const addToCart = (data) => {
        if (uid !== null) {
            console.log("Fetched data is ",data)
            Product = data;
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;

            console.log("uid in add to cart is ", uid.uid)
            fs.collection('Cart ' + uid).doc(data.ID).set(Product).then(()=> {
                console.log("cart added sucessfully: product id is ", data.ID)
            })
        }
        else {
            console.log("Login is required");
            history('/login')
        }
    }

    return (
        <div className='wrapper'>
            <Navbar user={user} totalProduct = {totalProduct} />
            <br />
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center my-3'>Products</h1>
                    <div className='products-box'>
                        <Products product={products} addToCart={addToCart} />
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please Wait. . . </div>
            )}
            {/* <Products/> */}
        </div>
    )
}

export default Home