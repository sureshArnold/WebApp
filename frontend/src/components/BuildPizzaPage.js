import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';  // Adjust the path to go one directory up to access App.css


function BuildPizza() {
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Base price for pizza

  useEffect(() => {
    // Fetch ingredients from the backend
    axios.get('http://localhost:5000/api/ingredients')
      .then((response) => {
        setAvailableIngredients(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching ingredients!', error);
      });
  }, []);

  const handleIngredientToggle = (ingredient) => {
    const updatedIngredients = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter((item) => item !== ingredient)
      : [...selectedIngredients, ingredient];

    setSelectedIngredients(updatedIngredients);
    calculatePrice(updatedIngredients);
  };

  const calculatePrice = (ingredients) => {
    let price = 0; // Base price
    ingredients.forEach((ingredient) => {
      const selected = availableIngredients.find((item) => item.name === ingredient);
      price += selected.price;
    });
    setTotalPrice(price);
  };

  //Adding items to cart
  const handleAddToCart = () => {
    // Pass data to cart via navigation state
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    const newPizza = {
      name: `Custom Pizza #${currentCart.length + 1}`,
      ingredients: selectedIngredients,
      price: totalPrice
    };

    const updatedCart = [...currentCart, newPizza];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Optional
    alert('Successfully added to cart!');

  };

  return (
    <div className="build-pizza">
      <h2>Build Your Pizza</h2>
      <div className="ingredients">
        {availableIngredients.map((ingredient) => (
          <div key={ingredient._id} className="ingredient-item">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient.name)}
              onChange={() => handleIngredientToggle(ingredient.name)}
            />
            <img src={ingredient.image} alt={ingredient.name} width="50" />
            <label>{ingredient.name}</label>
            <p>Price: ${ingredient.price}</p>
          </div>
        ))}
      </div>
      <p>Total Price: ${totalPrice}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}

export default BuildPizza;

