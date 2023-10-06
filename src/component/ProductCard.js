import React   from 'react'
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';


const ProductCard = (props) => {
  const {product,alert,setfProgress} = props;


  return (
    <div className="col-4 hp">
    <div className="card h-100 shadow-sm">
      <a href="/">
        <img src={`http://localhost:5000/media/${product.img}`} className="card-img-top" alt="product.title" />
      </a>
      <div className="label-top shadow-sm"></div> 
      <div className="label-top shadow-sm">
        <div className="text-white" >{product.category}</div>
      </div>
      <div className="card-body">
        <div className="clearfix mb-3">
          <span className="float-start badge rounded-pill bg-success">{product.Price}$</span>

          {/* <span className="float-end"><a href="/" className="small text-muted text-uppercase aff-link">reviews</a></span> */}
        </div>
        <h3 className="card-title">
          <Link  to={`/single/${product._id}`}>{product.Product_name}</Link>
        </h3>

       <AddToCart product={product} setfProgress={setfProgress} alert={alert}/>
        <div className="clearfix mb-1">

          <span className="float-start"><><i className="fas fa-question-circle"></i></></span>

          <span className="float-end">
            
{/* style={{cursor:'pointer'}} */}<i className="far fa-heart"></i>

          </span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductCard
