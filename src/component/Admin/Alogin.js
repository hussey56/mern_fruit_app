import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Alogin = (props) => {

    const {showAlert} = props;
    const token = localStorage.getItem('user_token');

    let history = useNavigate();  // used for redirecting

const [data,setData] = useState({email:"",password:""});
const onChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
}
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
history('/')
    }
    else if(json.errors){
        showAlert('warning','Invalid Credentilas');
 
    }
    

}
useEffect(()=>{
    if(token){
        history('/');
    }
},[])

  return (
    <>
       <div className="vh-100 d-flex justify-content-center align-items-center ">
            <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
                <h2 className="text-center mb-4 text-primary">Admin Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email"  className="form-control border border-primary" onChange={onChange} value={data.email} id="email" name='email'  required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control border border-primary" onChange={onChange} value={data.password} name='password' id="password" required/>
                    </div>
                    {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
                <div className="mt-3">
                    <p className="mb-0  text-center">Don't have an account? <Link to={'/register'}
                            className="text-primary fw-bold">Sign
                            Up</Link></p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Alogin
