

const cartReducer = (state,action) => {

 if(action.type === 'ADD_TO_CART'){
    let {id,name,price,category,quantity,product} = action.payload;
    let existing = state.cart.find((curItem)=>curItem.id ===  id);
    if(existing){
        let updateProduct = state.cart.map((curElement)=>{
            if(curElement.id === id){
                let newAmt = curElement.quantity + quantity;
                return{
                    ...curElement,
                    quantity:newAmt
                }
            }
            else{
                return curElement;
            }
         

        });
        return {
            ...state,
            cart:updateProduct
        }
    }
else{
    let newItem = {
        id:id,
        name:name,
        quantity:quantity,
        price,
        category,
        product

    }
    return{
        ...state,cart:[...state.cart,newItem]
    }
}
 }
 if(action.type === 'CLEAR_CART'){

    return{
        ...state,
        cart:[],
    }
 }
 if (action.type === 'REMOVE_CART'){
    let UpdateCart = state.cart.filter((current)=>(current.id !== action.payload));
    return{
        ...state,
        cart:UpdateCart,
    }
 }
 if (action.type === 'MINUS_CART') {
    let updateqty = state.cart.map((current)=>{
        if(current.id === action.payload){
            let decAmount = current.quantity - 1;
            if(current.quantity <= 1){
                decAmount = 1;
            }
            return{
                ...current,
                quantity:decAmount,
            }
           
        }
        else{
            return current;
        }
    });
    return{
        ...state,
        cart:updateqty,
    }
 }
 if (action.type === 'PLUS_CART') {
    let updateqty = state.cart.map((current)=>{
        if(current.id === action.payload){
            let incAmount = current.quantity + 1;
            if(current.quantity >= 5){
                incAmount = 5;
            }
            return{
                ...current,
                quantity:incAmount,
            }
           
        }
        else{
            return current;
        }
    });
    return{
        ...state,
        cart:updateqty,
    }
 }
 if (action.type === 'TOTAL_PRICE') {
    let totalAmount = state.cart.reduce((initialValue,curElement)=>{
let {quantity,price} = curElement;
initialValue = initialValue + price * quantity;
return initialValue;
    },0);
    return{
        ...state,
        total:totalAmount,
    }
 }
 
    return state;
   
}

export default cartReducer
