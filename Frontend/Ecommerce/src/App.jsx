import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'; // ✅ CORRECT
import Home from './Pages/Home'; // ✅ CORRECT
import Register from './Pages/Register'; // ✅ CORRECT
import Navbar from './Componets/Navbar';
import Verify from './Pages/Verify';
import ForgetPassword from './Pages/ForgetPassword';
import VerifyForgetOtp from './Pages/VerifyForgetOtp';
import ResetForgetPassword from './Pages/ResetForgetPassword';
import MyAccount from './Pages/MyAccount';
import Product from './Pages/Product';
import ProductDetails from './Pages/ProductDetails';
import Layout from './Componets/Layout';
import Electronics from './Pages/Electronics';



function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
       <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forget' element={<ForgetPassword/>} />
        <Route path='/verifyForgetOtp' element={<VerifyForgetOtp/>} />
        <Route path='/resetForgetPassword' element={<ResetForgetPassword/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myaccount' element={<MyAccount/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/electronics' element={<Electronics/>} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
