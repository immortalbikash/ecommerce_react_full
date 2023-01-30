import React, { useState } from 'react'
import './Modal.css'
import { auth, fs } from '../config/Config';
import { useNavigate } from 'react-router-dom';

const Modal = (props) => {

  const history = useNavigate();

  // form states
  const [cell, setCell] = useState(null);
  const [residential,setResidential] = useState('');
  const [cartPrice] = useState(props.totalPrice);
  const [cartQty] = useState(props.totalQty);

  const submitHandler = async(e) => {
    e.preventDefault();
    // user uid
    const uid = auth.currentUser.uid;
    const userData = await fs.collection('users').doc(uid).get();
    await fs.collection('Buyer-Personal-Info').add({
      Name: userData.data().Fullname,
      Email: userData.data().Email,
      CellNo: cell,
      ResidentialAddress: residential,
      CartPrice: cartPrice,
      CartQty: cartQty
    })
    const cartData = await fs.collection('Cart '+ uid).get();
    for(var snap of cartData.docs){
      var data = snap.data();
      data.ID = snap.id;
      console.log("The snap.id is", data.ID);
      await fs.collection('Buyer-Cart ' + uid).add(data);
      await fs.collection('Cart ' + uid).doc(data.ID).delete();
    }
    props.modalValue(false);
    history('/')
  }
  const cancelHandler = (e) => {
    e.preventDefault();
    props.modalValue(false);
  }

  return (
    <div className='backdrop'>
      <div className='model'>
      <form>
        <div>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder='Cell No' onChange={(e)=> setCell(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder='Residential Address' onChange={(e)=> setResidential(e.target.value)} />
          </div>
          <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Total Quantity</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={cartQty} />
      </div>
      <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Total Price</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={cartPrice} />
      </div>
          <button type="submit" className="btn btn-success mx-3" onClick={submitHandler}>Submit</button>
          <button type="submit" className="btn btn-danger" onClick={cancelHandler}>Cancel</button>
        </div>
        </form>

      </div>
    </div>
  )
}

export default Modal