import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import ShopCategory from './Pages/ShopCategory';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DummyPayment from './Components/DummyPayment/DummyPayment';
import ThankYou from './Components/Thankyou/Thankyou';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/payment' element={<DummyPayment/>} />
        <Route path='/thank-you' element={<ThankYou/>} /> 
      </Routes>
      <ToastContainer />
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
