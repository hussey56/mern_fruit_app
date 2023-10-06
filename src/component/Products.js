import   { useEffect, useState} from 'react'
import '../Ccss/Product.css'
import ProductCard from './ProductCard'
import Spinner from './Spinner'
import SearchBar from './SearchBar'
import InfiniteScroll from "react-infinite-scroll-component";

const Products = (props)=> {
  const {showAlert , setfProgress} = props;
const [data,setData] = useState([])
const [total,setTotal] = useState(0)
const [loading,setLoading] = useState(false)
const [page,setPage] = useState(1)
const fetchMoreData =async()=>{
  setLoading(true)
  setfProgress(40)
  const url = `http://localhost:5000/api/products/getproduct?page=${page+1}`;
  setPage(page+1)
  const request = await fetch(url,{
    method:'GET'
  })
  
  const response = await request.json();
  setfProgress(60)
 
setData(data.concat(response.data))
setfProgress(80)
setfProgress(100)

setLoading(false)
}

// const [PriceCheckBox,setPriceCheckBox] = useState(false)
// const handleCheckboxChange = (event) => {
//   setPriceCheckBox(event.target.checked);
// };
// 
 
// const handleSort = async (e)=>{
//   e.preventDefault();
//   if(PriceCheckBox === true){
//   }
 
// }
const getdata = async()=>{
  setLoading(true)
  setfProgress(40)
  const request = await fetch(`http://localhost:5000/api/products/getproduct?page=${page}`,{
    method:'GET'
  })
  const response = await request.json();
  setfProgress(60)
  const {data,tl} = response
setData(data)
setfProgress(80)
setTotal(tl)
setfProgress(100)

setLoading(false)

}
  useEffect(() => {
   
 getdata()
  },// eslint-disable-next-line
   [])

 
  return (
    <>
    <div className="container-fluid bg-trasparent my-4 p-3 " style={{position:' relative'}}>
      <div className="row">
        <div className="col-md-12">
          <SearchBar setfProgress={setfProgress}/>
        </div>
      </div>
      <h1 className='text-center mt-2 mb-4'>Top Products</h1>
<br />{loading && <Spinner/> }
<InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={data.length !== total }
            loader={<Spinner />}
          >
<div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">

  {/* <div className="col-md-12">
  <form onSubmit={handleSort}>
   <div className="container">
    <div className='float-start'>
    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Sort By
  </button>
  <ul className="dropdown-menu dropdown-menu-light ">
  <li className='container'>
    <div className="form-check ">
    <label className="form-check-label" htmlFor="Price">
    Price
  </label>
  <input className="form-check-input" type="checkbox" checked={PriceCheckBox}
        onChange={handleCheckboxChange} id="Price" />
 
</div>
</li>    

  </ul>
</div>





    </div>
 
      <button className='btn btn-info float-end btn-lg text-white' type='submit'>Filter</button>
   
   </div>
   <br />
   
   </form>
  </div> */}
   
        
   {data.length !== 0 && data.map((product)=>{
 return  <ProductCard key={product._id} product={product} setfProgress={setfProgress} alert={showAlert} />
  })
}

   
  </div>
  </InfiniteScroll>  

</div>


    </>
  )
}

export default Products
