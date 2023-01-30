import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import AddProduct from './component/AddProduct';
import Login from './component/Login';
import Signup from './component/Signup';
import Cart from './component/Cart';
import Modal from './component/Modal';

const App = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addproduct' element= {<AddProduct/>}/>
        <Route path ='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        {/* <Route path='/modal' element = {<Modal/>}/> */}
      </Routes>
      {/* IndividualCartProduct component is not showing video 12 min */}
    </>
  )
}

export default App