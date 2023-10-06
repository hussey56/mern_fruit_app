import React , {useContext, useState} from 'react'
import CartContext from '../context/cart/cartContext';

const AddToCart = (props) => {
    const {product,alert,setfProgress} = props;
    const {_id,Product_name,Price,category} = product;
   const[quantity,setQuantity] =  useState(1);
    const context = useContext(CartContext);
    const {addToCart} = context;
    const add = async(e)=>{
e.preventDefault();
setfProgress(50);
const newt = await addToCart(_id,Product_name,Price,category,quantity,product)
setfProgress(100);
alert('success','Product Added Successfully');
    }
  return (
    <div className="d-grid gap-2 my-4">

    <button className="btn btn-warning bold-btn" onClick={add}>add to cart</button>

  </div>
  )
}

export default AddToCart
