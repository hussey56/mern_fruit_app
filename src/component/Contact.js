import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import '../Ccss/Contact.css'
const Contact = (props) => {
  const {showAlert} = props;
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState({name:"",email:"",phone:"",subject:"",message:""});
  const onChange = (e)=>{
setData({...data,[e.target.name]:e.target.value});
  }
  const handleSubmit = async(e)=>{
e.preventDefault();
setLoading(true)
const request = await fetch('http://localhost:5000/api/contact/send',{
  method:'POST',
  headers:{
    'Content-Type': 'application/json',

  },
  body:JSON.stringify({name:data.name,email:data.email,Phone:data.phone,subject:data.subject,message:data.message})
})
const json = await request.json();
setLoading(false);
if(json.docs){
    showAlert('success','Message Sent Successfully');
    setData({name:"",email:"",phone:"",subject:"",message:""});
}
else{
    showAlert('danger','Not Send Message Server issue')

}
  }
  return (
    <div className='container'>
     <section className="contact-sec sec-pad">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="contact-detail">
          <h1 className="section-title">Contact us</h1>

          <ul className="contact-ul">
            <li><i className="fa fa-location-dot"></i> Bait ul Anam A-5 nk , Karachi</li>

            <li>
              <i className="fa fa-phone"></i>
              <a href="/tel:08510004495"><b>0255000XXXX</b></a>,
              <a href="/tel:08510005495"><b>0251600XXXX</b></a>
            </li>

            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="/mailto:pardeepkumar4bjp@gmail.com"><b> demounknown@gmail.com</b></a>
            </li>
          </ul>

          <span className='my-2'>
            <Link to="/" className="fb"><i className="fa-brands fa-facebook"></i></Link>
            <Link to="/" className="insta"><i className="fa-brands fa-instagram"></i></Link>
            <Link to="/" className="twitter"><i className="fa-brands fa-twitter"></i></Link>
          </span>
        </div>
      </div>

      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="contFrm">
          <div className="row">
            <div className="col-sm-6">
              <input type="text" minLength={5} name="name" onChange={onChange} value={data.name} placeholder="Your Name" className="inptFld" required />
            </div>

            <div className="col-sm-6">
              <input type="email" name="email"  placeholder="Email Address" onChange={onChange} value={data.email} className="inptFld" required />
            </div>

            <div className="col-sm-6">
              <input type="number" name="phone"  placeholder="Phone Number" onChange={onChange} value={data.phone} className="inptFld" required />
            </div>

            <div className="col-sm-6">
              <input type="text" name="subject" min={4} id='subject' onChange={onChange} value={data.subject}  placeholder="Subject" className="inptFld" required />
            </div>

            <div className="col-12">
              <textarea className="inptFld" name='message' id='message' onChange={onChange} rows=""  cols="" value={data.message} placeholder="Your Message..." required></textarea>
            </div>

            <div className="col-12 text-center">
              <button  disabled={loading===true} type="submit" name="submit"  className="inptBtn" >Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

 

  </div>
</section>
    </div>
  )
}

export default Contact
