import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';  // Adjust the path to go one directory up to access App.css


function OrderPizza() {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch pizzas from the backend
    axios.get('http://localhost:5000/api/pizzas')
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching pizzas!', error);
      });
  }, []);

  // const addToCart = (pizza) => {
  //   setCart([...cart, pizza]);
  // };

  const addToCart = (pizza) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart([...cart, pizza]);
    cart.push(pizza);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("successfully added to cart");
  };


  return (
    <div className="order-pizza">
      <h2>Order Pizza</h2>
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <div key={pizza._id} className="pizza-item">
            <img src={pizza.image} alt={pizza.name} width="200" />
            <h3>{pizza.name}</h3>
            <p>Ingredients: {pizza.ingredients.join(', ')}</p>
            <p>Price: ${pizza.price}</p>
            <button onClick={() => addToCart(pizza)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}

export default OrderPizza;

