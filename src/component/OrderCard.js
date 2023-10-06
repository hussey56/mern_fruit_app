import React from 'react'

const OrderCard = (props) => {
  const {order} = props
  return (
    <div className="col-md-6 my-2">
   
    <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4 text-primary"><span className="text-dark font-italic me-1">Order#</span>{order._id}
                  </p>
<hr />

<h4 className='text-dark text-center my-2'> <u> Order Cart</u></h4>
{order.cart.map((crtitem)=>{
  return  <div className='row' key={crtitem.id}>
     <p className='col-8   float-start'>{crtitem.name} ({crtitem.quantity}x)</p>
     <p className='col-4'>Rs.{crtitem.price}</p>
     </div>
    
})}
<hr />
<h4 className='text-dark text-center my-2'> <u> Order Details</u></h4>
<p><b>Name: </b> {order.name}</p>
<p><b>Email: </b> {order.email}</p>
<p><b>Address: </b> {order.address} (Zip:{order.zip})</p>
<p><b>Cart Total:</b>: <i>Rs.{order.cartTotal} ({order.payment})</i></p>



<hr />
<h4 className='text-dark text-center my-2'> <u> Order Status</u></h4>

                  <p className="mb-1" style={{fontSize:'.77rem'}} >Order Status</p>
                  <div className="progress rounded" style={{height:'5px'}} >
                    <div className="progress-bar" role="progressbar" style={{width:'20%'}} aria-valuenow="100"
                      aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              
             
           
               
                </div>
              </div>
              </div>
  )
}

export default OrderCard
