import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../Ccss/singlep.css'
import productContext from '../context/products/productContext';
import AddToCart from './AddToCart';
const SingleProduct = (props) => {
    const {showAlert,setfProgress} = props
  let { id } = useParams();

  const {single , getdata,singleLoading} = useContext(productContext)
  useEffect(()=>{
getdata(id);
setfProgress(100)
  },// eslint-disable-next-line
  [id])
  return (
    <>
    {singleLoading=== true && <><h2 className='text-center'>Loading....</h2></>}
    {single.length !== 0 && 
<div className="container mt-5 mb-5">
    <div className="row d-flex justify-content-center">
        <div className="col-md-10">
            <div className="card">
                <div className="row">
                    <div className="col-md-6">
                        <div className="images p-3">
                            <div className="text-center p-4"> <img id="main-image" src={`http://localhost:5000/media/${single.img}`} width="250" alt={single.Product_name} /> </div>
                      
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center"> <i className="fa fa-long-arrow-left"></i> <span className="ml-1">Back</span> </div> <Link to={'/cart'} className="fa fa-shopping-cart text-muted"></Link>
                            </div>
                            <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">{single.category}</span>
                                <h5 className="text-uppercase">{single.Product_name}</h5>
                                <div className="price d-flex flex-row align-items-center"> <span className="act-price">${single.Price}</span>
                                    <div className="ml-2"> <small className="dis-price">${single.Price * 20/100}</small> <span>40% OFF</span> </div>
                                </div>
                            </div>
                            <p className="about">Shop from a wide range of {single.Product_name} from orianz. Pefect for your everyday use, you could pair it with a Frwsh Meal For Your Daily Diet.</p>
                            <div className="sizes mt-5">
                                <h6 className="text-uppercase">Category</h6>
                                 <label className="radio"> <span>{single.category}</span> </label> 
                                 
                            </div>
                            <div className="cart mt-4 align-items-center">
                                 <AddToCart product={single} setfProgress={setfProgress} alert={showAlert}/>
                                  </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

}
    </>
  )
}

export default SingleProduct
