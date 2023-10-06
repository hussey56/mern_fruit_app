import {useEffect, useReducer} from 'react'
import cartReducer from '../../reducers/cartReducer'
import CartContext from './cartContext'

const CartsState = (props) => {

const localStorageData = ()=>{
  let oldData = localStorage.getItem('cart');
  const parsedData = JSON.parse(oldData);
  if(!Array.isArray(parsedData)){
    return []
  }
  else{
    return parsedData;
  }
}




    const initialValue = {
        cart:localStorageData() || [],
        total_item:"",
        total:0,
        shipping:1000,
        loading:false
    }
 const [state,dispatch] = useReducer(cartReducer,initialValue);
const addToCart = (id,name,price,category,quantity,product)=>{
dispatch({type:'ADD_TO_CART',payload:{id,name,price,category,quantity,product}});
}
const clearCart = ()=>{
  dispatch({type:'CLEAR_CART'})
}
const removeCart = (id)=>{
dispatch({type:'REMOVE_CART',payload:id});
}
const incrementQ = (id)=>{
dispatch({type:'PLUS_CART',payload:id});
}
const decrementQ = (id)=>{
dispatch({type:'MINUS_CART',payload:id});
}

useEffect(()=>{

localStorage.setItem('cart',JSON.stringify(state.cart));
dispatch({type:'TOTAL_PRICE'});

},[state.cart])

  return (
    <CartContext.Provider value={{...state,addToCart,clearCart,removeCart,incrementQ,decrementQ}}>
        {props.children}
    </CartContext.Provider>
  )
}
export default CartsState

