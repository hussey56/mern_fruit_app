import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './Spinner';

const Register = (props) => {
    let history = useNavigate();
const {showAlert} = props;
const [data,setData] = useState({name:"",email:"",password:"",cpassword:"",gender:"male",address:"",});
const [loading,setLoading] = useState(false);

const onChange = (e)=>{
setData({...data,[e.target.name]:e.target.value});
}
props.setfProgress(30)
const handleSubmit = async (e)=>{
e.preventDefault();
props.setfProgress(50)
setLoading(true)
const response = await fetch('http://localhost:5000/api/users/sign',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
          },
          body:JSON.stringify({name:data.name,email:data.email, password:data.password,gender:data.gender,address:data.address})
        
});
props.setfProgress(80)
const json = await response.json();
setLoading(false);
props.setfProgress(100)
if(json.token){
    showAlert('success','User Registered Successfully')
}
else{
    showAlert('danger','This Email linked with another Account')

}


}
const toke = localStorage.getItem('user_token');
useEffect(()=>{
    if(toke){
history('/');
    }
},[])




  return (
    <div className="vh-100 d-flex justify-content-center align-items-center ">
    <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
        <h2 className="text-center mb-4 text-primary">Sign Up Form</h2>
        <form onSubmit={handleSubmit}>  
          <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" minLength={5} onChange={onChange} className="form-control border border-primary" id="name" name='name' aria-describedby="emailHelp" value={data.name} required/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" onChange={onChange} className="form-control border border-primary" id="email" name='email' aria-describedby="emailHelp" value={data.email} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Select Gender</label>
                <select name="gender"  className="form-control border border-primary" onChange={onChange} id="gender" value={data.gender}>
<option value="male">Male</option>
<option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" onChange={onChange} value={data.address} required minLength={8} className="form-control border border-primary" id="address" name='address'/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={onChange} value={data.password} required minLength={8} className="form-control border border-primary" id="password" name='password'/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" onChange={onChange} value={data.cpassword} required minLength={8} className="form-control border border-primary" name='cpassword' id="cpassword"/>
            </div>
            <div className="d-grid">
                <button disabled={data.password !== data.cpassword || loading === true} className="btn btn-primary" type="submit">Register</button>
            </div>
            {loading && <Spinner/>}
        </form>
        <div className="mt-3">
            <p className="mb-0  text-center">Already have an account? <Link to={'/login'}
                    className="text-primary fw-bold">Login
                    </Link></p>
        </div>
    </div>
</div>


  )
}

export default Register
