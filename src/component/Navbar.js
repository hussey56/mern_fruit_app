import React, { useEffect, useState ,useContext }  from 'react'
import {Link,useLocation , useNavigate} from "react-router-dom";
import CartContext from '../context/cart/cartContext';



const Navbar = (props) => {
  const context = useContext(CartContext);
  const {cart} = context;

  const {showAlert} = props;
  const [name,setName] = useState('Name');
  let history = useNavigate();

const handleLogout = ()=>{

  localStorage.removeItem('user_token');
  history('/login');
  showAlert('info','Loggedout Successfully')
}

let token = localStorage.getItem('user_token')

  const user_name = async()=>{
    const request = await fetch('http://localhost:5000/api/users/userdata',{
      method:'POST',
      headers:{
      "user_token":token,
    }
    });
    const json = await request.json();
    
    if(json.invalid){
      localStorage.removeItem('user_token');
      history('/login');
      showAlert('info','By Default Execution')
token = false;
    }
    const uname = await json.name;
    setName(uname);
   
  }
 

useEffect(()=>{
  if(token){
    user_name();

  }
},// eslint-disable-next-line
[token])

 let location = useLocation();
  return (
 <>
 <link rel="stylesheet" href="https://unpkg.com/@webpixels/css@1.0/dist/index.css" />
<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3 sticky-top">
  <div className="container-xl">
   
    <Link className="navbar-brand" to={'/'}>
     <h2 className='text-light'><span><i>current</i></span>Shop</h2> 
    </Link>
 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
    <div className="collapse navbar-collapse" id="navbarCollapse">
    
      <div className="navbar-nav mx-lg-auto">
        <Link className={`nav-item nav-link ${location.pathname==="/"?"active":""}`} to={'/'} style={{fontSize:'20PX'}} aria-current="page">Home</Link>
        <Link className={`nav-item nav-link ${location.pathname==="/contact"?"active":""}`} style={{fontSize:'20PX'}} to={'/contact'}>Contact</Link>
      
      </div>
     
      <div className="navbar-nav ms-lg-4">
        <Link className="nav-item nav-link" to={'/cart'}>
        <button type="button" className="btn btn-sm btn-warning">
 Cart <span className="badge bg-light text-dark">{cart.length}</span>
</button> </Link>
      </div>
     
      <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
        {!localStorage.getItem('user_token') &&
        <>
        <Link to={'/register'} className="btn btn-sm btn-primary w-full w-lg-auto">
          Register
        </Link>
        <Link to={'/login'} className="btn btn-sm btn-secondary w-full w-lg-auto mx-2">
        Sign in
        </Link></>}
        {localStorage.getItem('user_token') &&
        <>
        <button onClick={handleLogout} className="btn btn-sm btn-secondary w-full w-lg-auto mx-2">
       Logout
        </button>
          <Link to='/account' className="btn btn-sm btn-info w-full w-lg-auto mx-2">
          {name}
           </Link>
           </>
       }
       
      </div>
     
    </div>
  </div>
</nav>



 </>
  
   
  )
}

export default Navbar
