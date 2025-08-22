import React from "react";
import { Link } from "react-router-dom";
//import '../styles.css'
//import '../App.css';  // Adjust the path to go one directory up to access App.css


function Navbar() {
  return (
    <nav>
      <div className="logo">Pizzeria</div>
      <div className="links">
        <Link to="/order-pizza">Order Pizza</Link>
        <Link to="/build-pizza">Build Your Pizza</Link>
      </div>
    </nav>
  );
}

export default Navbar;

