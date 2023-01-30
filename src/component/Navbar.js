import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login'
import { auth } from '../config/Config'

const Navbar = (props) => {

    const history = useNavigate();

    const handleLogout = () => {
        auth.signOut().then(()=>{
            history('/login')
        })
    }

  return (
    <div className='navbox'>
        <div className='leftside'>
            <img src={require('../images/logo.png')} className='logo'/>
        </div>
        <div className='rightside'>
        {!props.user && <>
            <Link className='navlinks' to='/signup'>SIGNUP</Link>
            <Link className='navlinks' to = '/login'>LOGIN</Link>
        </>}

        {props.user && <>
            <div><Link className='nav-link mx-2' to='/'>{props.user}</Link></div>
            <div className='cart-menu-btn'>
                <Link className='navlink' to= '/cart'>
                    <i className="bi bi-cart"></i>
                </Link>
                <span>{props.totalProduct}</span>
            </div>
            <div className='btn btn-danger btn-md mx-2' onClick={handleLogout}>
                LOGOUT
            </div>
        </>}
            
        </div>
    </div>
  )
}

export default Navbar