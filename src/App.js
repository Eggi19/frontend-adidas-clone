import Navbar from './Component/navbar/navbar';
import Register from './Pages/register/register';
import Footer from './Component/footer/footer';
import Login from './Pages/login/login';
import Home from './Pages/home/home';
import Product from './Pages/product/product';
import DetailPage from './Pages/detailPage/detailPage';
import Cart from './Pages/cart/cart';

import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { keepLoginAsync } from './Features/username/usernameSlice';
import { getCartAsync } from './Features/username/transactionSlice';

function App() {
  //redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(keepLoginAsync())
    dispatch(getCartAsync())
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<><Home /></>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product' element={<Product />} />
        <Route path='/detailpage/:id' element={<DetailPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
