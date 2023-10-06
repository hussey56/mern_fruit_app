import React, { useContext } from 'react'
import CartContext from '../context/cart/cartContext'
const CartRow = (props) => {
    const {cart} = props;
const context = useContext(CartContext);
const {removeCart,decrementQ,incrementQ} = context;
  return (
    <>
    <td>{cart.name}</td>
    <td>{cart.price}</td>
    <td><i className="fa-solid fa-plus mx-2" style={{cursor:'pointer'}} onClick={()=>incrementQ(cart.id)}></i>{cart.quantity}<i className="fa-sharp fa-solid fa-minus mx-2" onClick={()=>decrementQ(cart.id)} style={{cursor:'pointer'}}></i></td>
    <td>{cart.quantity*cart.price}</td>
    <td><i className="fa-solid fa-trash text-danger" onClick={()=>removeCart(cart.id)} style={{cursor:'pointer'}}></i></td>
      
    </>
  )
}

export default CartRow
