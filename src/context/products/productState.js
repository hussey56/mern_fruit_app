import ProductContext from "./productContext";
import { useReducer, useState } from "react";
import ProductReducer from "../../reducers/ProductReducer";

const ProductState = (props)=>{
const tproducts =[];
const [pro,setPro] = useState(tproducts);
const Initial ={
    data:[],
    totalproducts:0,
    totalpages:0,
    loading:false,
    error:false,
    single:{},
    singleLoading:true,
}
const [state,dispatch] = useReducer(ProductReducer,Initial)
const dataProduct = async()=>{
    const response = await fetch('http://localhost:5000/api/products/getproducts',{
        method:'GET',
      });
      const json = await response.json();
      setPro(json);

    };
const getAlldata = async(page)=>{
  dispatch({type:'SET_LOADING'})
  const response = await fetch(`http://localhost:5000/api/products/getproduct?page=${page}`,{
    method:'GET',
    headers:{
        'Content-type':'application/json'
    }
});

const fd = await response.json();
dispatch({type:'SET_LOADING_FALSE'})
dispatch({type:'GET_ALL_DATA',payload:fd})
}
  const getdata = async(id)=>{
    const request = await fetch(`http://localhost:5000/api/products/single/${id}`,{
        method:'POST',
    });
    const response = await request.json();
    dispatch({type:'SINGLE_PRODUCT',payload:response});
  }
    
const sortbyprice = async(page)=>{
  const request = await fetch(`http://localhost:5000/api/products/sortproductbyprice?page=${1||page}`,{
    method:'GET',
   });
   const response = await request.json();
   
   dispatch({type:'SORT_BY_PRICE',payload:response})
}


    return(
        <ProductContext.Provider value={{...state,pro,dataProduct,getdata,getAlldata,sortbyprice}} >
{props.children}
        </ProductContext.Provider>
    )
}
export default ProductState;