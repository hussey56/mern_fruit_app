import React, { useContext, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import '../Ccss/cart.css'
import CartContext from '../context/cart/cartContext'
import CartRow from './CartRow';

const Cart = (props) => {
  const {showAlert} =props;
const context = useContext(CartContext);
const {cart,clearCart,shipping ,total} = context
const token = localStorage.getItem('user_token');
const [data,setData]= useState({email:"",password:""});
let history = useNavigate();
const onChange = (e)=>{
setData({...data,[e.target.name]:e.target.value});
}
let chat = '';
const [info,setInfo] = useState(chat);
const handleSubmit = async(e)=>{
  e.preventDefault();
  const request = await fetch('http://localhost:5000/api/users/login',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
          },
          body:JSON.stringify({email:data.email, password:data.password})         
})

const json  = await request.json();
if(json.AuthToken){
    showAlert('success','Welcome to the Shop');
localStorage.setItem('user_token',json.AuthToken)
history('/checkout')
}
else if(json.errors){
    showAlert('warning','Invalid Credentials');
let newChat = '*Invalid Credentials';
setInfo(newChat)
}

}
  return (
    <>
 <div className="container">
  <div className="row">
    <>

<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Login For Checkout</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      <form onSubmit={handleSubmit}>
     
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={data.email} id="email"  name='email' aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={data.password} minLength={4} id="password" name='password' required/>
  </div>
<p className='text-danger text-center '>{info}</p>
  <button type="submit" className="btn btn-primary">Login</button>
</form>

     
    </div>
   
  </div>
</div>
    
    
    </>
    <div className="col-md-12">

      {cart.length === 0 && <h2 className='text-center my-2 mx-2'>No Item Selected in Your Cart</h2>}
      {cart.length !==0 &&
      <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sub Total</th>
            <th scope='col'>Remove</th>

          </tr>
        </thead>
        <tbody>
       
       {cart.map((cart)=>{
        return<tr key={cart.id}><CartRow key={cart.id} cart={cart}></CartRow></tr>
       })}
        </tbody>
      </table>
      <div className="container my-2">
        <Link to='/' className="btn btn-primary float-start">Continue Shopping</Link>
        <button className="btn btn-danger float-end" onClick={clearCart}>Clear Cart</button>
      </div>
      </>
      }
    </div>
    <div className="col-md-8"></div>
{cart.length !==0  &&
<>
    <div className="col-md-4 my-2 col-12 my-4  border border-secondary">

    <div className="fluid-container">
      <div className="container">
        
        <div className="float-start text-dark "><b> Subtotal:</b></div>
        <div className="float-end"><b>{total}</b></div>
        <br />
      </div>
      <div className="container">
        
        <div className="float-start">Shipping:</div>
        <div className="float-end">{shipping}</div>
        <br />
      </div>
     
      <div className="container">
        
        <div className="float-start"><b> Total:</b></div>
        <div className="float-end"><b>{total+shipping}</b></div>
      </div>
     
    </div>

    </div>
    <div className="col-md-8"></div>
    <div className='col-md-4 my-2 col-12'>{token? 
<Link className="btn btn-large btn-warning float-end" to='/checkout'>GO TO Checkout</Link>:
<button className="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
 Login To Checkout
</button>
}
    </div>
    </>
}

  </div>
 </div>
</>
  )
}

export default Cart
