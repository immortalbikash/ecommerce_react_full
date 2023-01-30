import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, fs } from '../config/Config';
import Home from './Home';

const Signup = () => {

    const history = useNavigate();

    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // console.log(fullname, email, password);
        auth.createUserWithEmailAndPassword(email, password).then((credential)=> {
            console.log(credential);
            fs.collection('users').doc(credential.user.uid).set({
                Fullname: fullname,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup successful. You will now get automatically redirected to login.');
                setFullName('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=> {
                    setSuccessMsg('');
                    history('/login');
                },3000)
            }).catch((error)=> setErrorMsg(error.message));
        }).catch((error)=> {
            setErrorMsg(error.message);
        })
    }

  return (
    <div className='container'>
        <br/>
        <br/>
        <h1>Sign Up</h1>
        <hr></hr>
        {successMsg && <>
            <div className='success-msg'>{successMsg}</div>
            <br/>
        </>}
        <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
            <label>Full Name</label>
            <input type="text" className ="form-control" required onChange={(e)=>setFullName(e.target.value)} value = {fullname}/>
            <br/>

            <label>Email</label>
            <input type="email" className ="form-control" required onChange={(e)=>setEmail(e.target.value)} value = {email}></input>
            <br/>

            <label>Password</label>
            <input type="password" className ="form-control" required onChange={(e)=>setPassword(e.target.value)} value = {password}></input>
            <br/>

            <div className='btn-box'>
                <span>Already have an account Login
                <Link to='/login'> Here</Link></span>
                <br></br>
                <button type='submit' className='btn btn-success btn-md'>SIGN UP</button>
            </div>
        </form>
        {errorMsg && <>
            <div className='error-msg'>{errorMsg}</div>
            <br/>
        </>}
    </div>
  )
}

export default Signup