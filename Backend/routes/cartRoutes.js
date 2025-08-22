const express = require('express');
const router = express.Router();

let cart = [];  // Simple in-memory cart

// Add regular pizza to cart
router.post('/add', (req, res) => {
    const { pizza } = req.body;
    if (!pizza) return res.status(400).json({ error: 'Pizza data required' });

    cart.push(pizza);
    res.json({ message: 'Pizza added to cart', cart });
});

// Add custom pizza to cart
router.post('/custom', (req, res) => {
    const { ingredients, price } = req.body;
    if (!ingredients || ingredients.length === 0 || !price) {
        return res.status(400).json({ error: 'Invalid pizza customization' });
    }

    const customPizza = { name: 'Custom Pizza', ingredients, price };
    cart.push(customPizza);
    res.json({ message: 'Custom pizza added to cart', cart });
});

// View cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Clear cart
router.delete('/clear', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared', cart });
});

module.exports = router;
