import { upload } from '@testing-library/user-event/dist/upload';
import React, { useState } from 'react'
import { storage } from '../config/Config';
import { fs } from '../config/Config';

const AddProduct = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const [imageError, setImageError] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/png', 'image/jpeg', 'image/jpeg', 'image/PNG']

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if(selectedFile && types.includes(selectedFile.type)){
            setImage(selectedFile);
            setImageError('')
        }
        else{
            setImage(null);
            setImageError("Please select a valid image type png or jpeg");
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
        // console.log(productName, productPrice, productImage);
        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            setUploadError(err.message)
        }, () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                fs.collection('Product').add({
                    title,
                    description,
                    price: Number(price),
                    url
                    // productName: productName,
                    // productPrice: productPrice,
                    // productImage: url
                }).then(()=> {
                    setSuccessMsg("Product added sucessfully!!")
                    setTitle('');
                    setDescription(0);
                    setPrice('');
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=> {
                        setSuccessMsg('');
                        // success message 3 sec paxi disapear gareko
                    },3000)
                }).catch(err => setUploadError(err.message));
            })
        })
    }

  return (
    <div className='container'>
        <h2>ADD PRODUCTS</h2>
        <hr/>
        {successMsg&& <span>{successMsg}</span>}
        <form onSubmit={addProduct}>
            <label htmlFor='product-name'>Product Title</label>
            <input type='text' className='form-control' required onChange={(e)=> setTitle(e.target.value)} value={title}/>
            <br/>

            <label>Product Description</label>
            <input type='text' className ='form-control' required onChange={(e)=> setDescription(e.target.value)} value={description}/>
            <br></br>

            <label htmlFor='product-price'>Product Price</label>
            <input type='number' className='form-control' required onChange={(e)=> setPrice(e.target.value)} value={price} />
            <br/>

            <label htmlFor='product-img'>Product Image</label>
            <br/>
            {imageError && <span>{imageError}</span>}

            <input className='form-control' type='file' onChange={productImgHandler} id = 'file'/>
            <br/>

            <button className = 'btn btn-success btn-md my-btn'>Add</button>
        </form>
        {uploadError && <span>{upload}</span>}
    </div>
  )
}

export default AddProduct