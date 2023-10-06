import React, {  useEffect , useState  } from 'react'
import ProductCard from './ProductCard';


const Pagination = () => {
    let [data, setData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const [tp,setTp] = useState(2)

  const getData = async (page) => {
    const response = await fetch(`http://localhost:5000/api/products/getproduct?page=${page}`,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    });
    const fd = await response.json();
    const tp = fd.totalPages;
    setData(fd.data);
    setTp(fd.totalPages);
  }
  

  useEffect(() => {
    getData(currentPage);
  }, [currentPage])

  const handlePrevClick = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  }


  return (
    <div className='row my-3'>
         {data.length===0 && <h2 className='text-center'>No Product Avalilable</h2> }
   {data.length !== 0 && data.map((product)=>{
 return  <ProductCard key={product._id} product={product} />
  })
}
<div className="row">
    <div className="col-md-12 container">
    <button disabled={currentPage<=1} onClick={handlePrevClick} className='float-start btn-primary btn'>Previous</button>
          <button  onClick={handleNextClick} disabled={currentPage === tp} className='float-end btn-secondary btn'>Next</button>
    </div>
</div>
    </div>
  )
}

export default Pagination
