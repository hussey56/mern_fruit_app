
import './App.css';
import Error from './component/Error'
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Products from './component/Products';
import Register from './component/Register';
import Login from './component/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './component/Contact';
import Cart from './component/Cart';
import ProductState from './context/products/productState';
import Alert from './component/Alert';
import { useState } from 'react';
import CartsState from './context/cart/CartsState';
import Checkout from './component/Checkout';
import Account from './component/Account';
import UserState from './context/user/UserState';
import SessionState from './context/login/SessionState'; // falto
import SingleProduct from './component/SingleProduct';
import Pagination from './component/Pagination';
import LoadingBar from 'react-top-loading-bar';
import File from './component/Admin/File';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (type,message,)=>{
    setAlert({type,message});
    setTimeout(()=>{
      setAlert(null);
    },1000)
  }
  const [progress,setProgress] = useState(10);


  const setfProgress = (progress)=>{
  setProgress(progress)
   }

  return (
    <>
    <SessionState>
<ProductState>
<CartsState>
<UserState>
<BrowserRouter>  
<LoadingBar
        color='#FFFF00'
        progress={progress}
        height={6}
        
      />

    <Navbar showAlert={showAlert} setfProgress={setfProgress}/>
   
    <Alert Alert={alert}/>
    <Routes>
    <Route path="/"  element={<Products showAlert={showAlert} setfProgress={setfProgress}/>} />
    <Route path="/contact" element={<Contact showAlert={showAlert} setfProgress={setfProgress}/>} />
    <Route path="/register" element={<Register showAlert={showAlert} setfProgress={setfProgress}/>} />
    <Route path="/cart" element={<Cart showAlert={showAlert} setfProgress={setfProgress}/>} />
    <Route path="/login" element={<Login showAlert={showAlert} setfProgress={setfProgress}/>} />
    <Route path="/checkout" element={<Checkout showAlert={showAlert} setfProgress={setfProgress}/>}/>
    <Route path="/account" element={<Account showAlert={showAlert} setfProgress={setfProgress}/>}/>
    
    <Route path="/single/:id" element={<SingleProduct showAlert={showAlert} setfProgress={setfProgress}/>}/>
    <Route path="/pagination" element={<Pagination showAlert={showAlert}/>} setfProgress={setfProgress}/>
    <Route path="/file" element={<File showAlert={showAlert}/>} setfProgress={setfProgress}/>

    <Route path="*" element={<Error setfProgress={setfProgress}/>} />
    




    </Routes>
    
    <Footer setfProgress={setfProgress}/>
    </BrowserRouter>
    </UserState>
    </CartsState>

    </ProductState>
    </SessionState>
    </> 
  );
}

export default App;
