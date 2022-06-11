import './App.css';
import Orders from './components/orders';
import Customers from './components/customers';
import Products from './components/products';
import NavBar from './components/navbar';
import Home from './components/home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar></NavBar>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
