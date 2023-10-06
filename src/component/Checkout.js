import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartContext from '../context/cart/cartContext'
const Checkout = (props) => {
  const {showAlert} = props;
  const context = useContext(CartContext);
  const {total , cart , clearCart} = context;
  let header = useNavigate();
  const token = localStorage.getItem('user_token')
  useEffect(()=>{
if(!token){
  header('/login');
  showAlert('info','Login First to checkout');
}
if(cart.length === 0){
  header('/');

}
  },[])
  const [data,setData] = useState({name:"",email:"",phone:"",address:"",payment:"",zip:""});
  const onChange = (e)=>{
   
     setData({...data,[e.target.name]:e.target.value}); 
    
  }
  // const cartJson = JSON.stringify(cart);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const request = await fetch('http://localhost:5000/api/orders/giveorder',{
      method:'POST',
      headers:{
        'user_token':token,
        "Content-Type": 'application/json',

      },
      body:JSON.stringify({name:data.name,email:data.email,phone:data.phone,address:data.address,payment:'COD',zip:data.zip,cart,cartTotal:total,payment_status:'paid'})
    }
);
const json = await request.json();
if(json.success){
  showAlert("success","Your Order Has been Placed");
  clearCart();
  header('/');
}
  }
  return (
    <div className='container border border-primary my-4'>
<h1 className='text-center'>CHECKOUT</h1>
<hr className='text-dark' />
<form onSubmit={handleSubmit}>
<div className="row">
  <div className="col-md-12 d-flex justify-content-center">
    <button className="btn btn-lg btn-dark  my-1 mx-1">Cart Total : <span className="badge bg-warning">${total}</span> </button>
  <button className=" btn btn-lg btn-info  my-1 mx-1">Cart Items : <span className="badge bg-dark">{cart.length}</span> </button>
  </div>
 

  <div className="col-md-6 col-12">

  <div className="mb-3">
  <label htmlFor="name" className="form-label">Name</label>
  <input type="text" className="form-control" onChange={onChange} minLength={5} name='name' id="name" placeholder="Enter Your Name" required/>
</div>
<div className="mb-3">
<label htmlFor="email" className="form-label">Email address</label>
  <input type="email" className="form-control" onChange={onChange} name='email' id="email" placeholder="name@example.com" required/>
</div>
<div className="mb-3">
<label htmlFor="phone" className="form-label">Phone</label>
  <input type="number" className="form-control" onChange={onChange} minLength={7} name='phone' id="phone" placeholder="0321-12345678" required/>
</div>
  </div>
  <div className="col-md-6 col-12">
  <div className="mb-3">
<label htmlFor="address" className="form-label">Address</label>
  <input type="text" className="form-control" onChange={onChange} minLength={10} name='address' id="address" required />
</div>
<div className="mb-3">
<label htmlFor="payment" className="form-label">Payement Method</label>
<select name="payment" defaultValue={'COD'} onChange={onChange} className='form-control'>
  <option  value="COD" className='form-control'>Cash On Delivery</option>
  <option value="PAYPAL" className='form-control'>PayPal</option>
</select>
</div>
<div className="mb-3">
<label htmlFor="zip" className="form-label">Zip Code</label>
  <input type="text" onChange={onChange} name='zip' minLength={5} className="form-control" id="zip" placeholder="Enter Zip code or Postal code" required/>
</div>
  </div>
 

</div>
<div className="col-md-12 conatiner my-2">
    <div className="text-center">
      <button className="btn btn-success btn-lg" type='submit'>Checkout</button>
    </div>
  </div>
  </form>

    </div>
  )
}

export default Checkout
