import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'; // ✅ CORRECT
import Home from './Pages/Home'; // ✅ CORRECT
import Register from './Pages/Register'; // ✅ CORRECT
import Navbar from './Componets/Navbar';
import Verify from './Pages/Verify';
import ForgetPassword from './Pages/ForgetPassword';
import VerifyForgetOtp from './Pages/VerifyForgetOtp';
import ResetForgetPassword from './Pages/ResetForgetPassword';



function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
       <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forget' element={<ForgetPassword/>} />
        <Route path='/verifyForgetOtp' element={<VerifyForgetOtp/>} />
        <Route path='/resetForgetPassword' element={<ResetForgetPassword/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
