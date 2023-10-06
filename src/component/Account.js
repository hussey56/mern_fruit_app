import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import OrderCard from './OrderCard';

const Account = (props) => {
    const {showAlert} = props
    const context = useContext(UserContext);
    const {info,userData,orders,getOrders} = context;
    const {name,email,address,gender} = info; 
    let header = useNavigate();


const token = localStorage.getItem('user_token');

useEffect(()=>{
if(!token){
    header('/login');
}
userData();
getOrders();
},[]);
const handleLogout =()=>{
    
  localStorage.removeItem('user_token');
  header('/login');
  showAlert('info','Loggedout Successfully')
}
  return (

    <section style={{backgroundColor:'#eee'}}>
    <div className="container py-5">
 
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${gender==='male'?3:1||2}.webp`} alt="avatar"
                className="rounded-circle img-fluid"  style={{width: "150px"}}/>
              <h5 className="my-3">{name}</h5>
              <p className="text-muted mb-1">{email}</p>
              <p className="text-muted mb-4">{address}</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" onClick={handleLogout} className="btn btn-lg btn-outline-info ms-1">Logout</button>
              </div>
            </div>
          </div>

        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{name}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{email}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(097) 234-5678</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Gender</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{gender}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 my-3">
                <div className="card">
                <h1 className='text-center text-dark font-italic'>Your Orders</h1>

                </div>
                {orders.length === 0 && <p className='text-center text-dark'>No Orders Yet!</p>}

            </div>
          
   
          {orders.length !== 0 && orders.map((order)=>{
            return  <OrderCard key={order._id} order={order}  />
          })}
            
           
           
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Account
