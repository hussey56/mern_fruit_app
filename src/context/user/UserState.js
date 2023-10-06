import React, { useState } from 'react'
import UserContext from './UserContext'
const UserState = (props) => {
    const [info,setInfo] = useState({name:"",email:""});
 const userData = async ()=>{
    const token = localStorage.getItem('user_token');
    const request = await fetch('http://localhost:5000/api/users/userdata',{
        method:'POST',
        headers:{
        "user_token":token,
      }
      });
      const json = await request.json();
      setInfo(json);

 }

 const [orders,setOrders] = useState([]);
 const getOrders = async()=>{
    const token = localStorage.getItem('user_token');
   const response = await fetch('http://localhost:5000/api/orders/userorders',{
    method:'POST',
    headers:{
        "user_token":token,
    }
   });
   const json = await response.json();
   setOrders(json);
 }

    return(
        <UserContext.Provider value={{info,userData,orders,getOrders}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
