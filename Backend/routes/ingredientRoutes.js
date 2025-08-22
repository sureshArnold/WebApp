const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// Get all ingredients
router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
