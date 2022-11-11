import './App.css';
import React from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import ProductsDetails from './components/products/ProductDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/admin/Dashboard';
import { ProductList } from './components/admin/ProductList';


function App() {
  return (
  <Router>
    <div className="App">
      <Header/>
      <div className='container container-fluid'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/producto/:id" element={<ProductsDetails/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/listaProductos" element={<ProductList/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
