const ProductReducer = (state,action)=>{
    if(action.type==='SINGLE_PRODUCT'){
        return{
            ...state,
            single:action.payload,
            singleLoading:false
        }
    }
    if(action.type==='SET_LOADING'){
        return{
            ...state,
            loading:true,
            
        }
    }
    if(action.type==='SET_LOADING_FALSE'){
        return{
            ...state,
            loading:false
        }
    }
    if(action.type === 'GET_ALL_DATA'){
        const {data,totalPages} = action.payload
        return{
            ...state,
            data:data,
            totalpages:totalPages,
        }
    }
    if(action.type === 'SORT_BY_PRICE'){
        const {total,data} = action.payload
        return{
            ...state,
            data:data,
            totalpages:total,
        }
    }
return state
}
export default ProductReducer