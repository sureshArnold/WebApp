import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CartPage.css'

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Function to handle the "Buy Now" button click
  const handleBuyNow = () => {
    setOrderSuccess(true);
    // You can clear the cart after a successful order
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* If the order is successful, show the success message */}
      {orderSuccess && (
        <div className="success-message">
          <p>You ordered successfully!</p>
        </div>
      )}

      {/* If the cart is empty, show a message */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div>
          {/* Display each pizza in the cart */}
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.name}</h3>
              {item.ingredients && item.ingredients.length > 0 && (
                <p>Ingredients: {item.ingredients.join(', ')}</p>
              )}
              <p>Price: ${item.price}</p>
            </div>
          ))}

          <button onClick={handleBuyNow} className="buy-now-button">Buy Now</button>
        </div>
      )}

      {/* Link to go back to the menu */}
      <Link to="/order-pizza" className="back-to-menu">Back to Menu</Link>
    </div>
  );
}

export default CartPage;

