
import React from 'react';
//import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Navbar from "./components/Navbar";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import OrderPizzaPage from './components/OrderPizzaPage';
import BuildPizzaPage from './components/BuildPizzaPage';
import CartPage from './components/CartPage';
import '../src/styles.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order-pizza" element={<OrderPizzaPage />} />
        <Route path="/build-pizza" element={<BuildPizzaPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;



