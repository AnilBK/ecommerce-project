import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import './App.css';

import Home from './pages/Home';
import Admin from './pages/Admin';
import MyCart from './pages/MyCart/MyCart';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/mycart' element={<MyCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
