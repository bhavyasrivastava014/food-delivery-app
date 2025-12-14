const express = require('express');
const router = express.Router();

// Search food items and categories
router.post('/searchFood', async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm || searchTerm.trim() === '') {
            return res.json({ 
                success: true, 
                foodItems: global.food_items || [], 
                foodCategories: global.foodCategory || [] 
            });
        }

        const searchRegex = new RegExp(searchTerm.trim(), 'i'); // Case-insensitive search

        // Search in food items
        const matchingFoodItems = (global.food_items || []).filter(item => 
            searchRegex.test(item.name) || 
            searchRegex.test(item.CategoryName) ||
            searchRegex.test(item.description || '')
        );

        // Search in categories
        const matchingCategories = (global.foodCategory || []).filter(category =>
            searchRegex.test(category.CategoryName)
        );

        // Get unique categories from matching food items
        const categoryNames = [...new Set(matchingFoodItems.map(item => item.CategoryName))];
        const additionalCategories = (global.foodCategory || []).filter(category =>
            categoryNames.includes(category.CategoryName) && 
            !matchingCategories.some(mc => mc.CategoryName === category.CategoryName)
        );

        const allMatchingCategories = [...matchingCategories, ...additionalCategories];

        res.json({
            success: true,
            foodItems: matchingFoodItems,
            foodCategories: allMatchingCategories,
            searchTerm: searchTerm.trim(),
            totalResults: matchingFoodItems.length
        });

    } catch (error) {
        console.error('Error searching food:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get search suggestions
router.post('/searchSuggestions', async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm || searchTerm.trim().length < 2) {
            return res.json({ success: true, suggestions: [] });
        }

        const searchRegex = new RegExp(searchTerm.trim(), 'i');
        const suggestions = new Set();

        // Get food item name suggestions
        (global.food_items || []).forEach(item => {
            if (searchRegex.test(item.name)) {
                suggestions.add(item.name);
            }
        });

        // Get category suggestions
        (global.foodCategory || []).forEach(category => {
            if (searchRegex.test(category.CategoryName)) {
                suggestions.add(category.CategoryName);
            }
        });

        // Convert to array and limit to 5 suggestions
        const suggestionArray = Array.from(suggestions).slice(0, 5);

        res.json({
            success: true,
            suggestions: suggestionArray
        });

    } catch (error) {
        console.error('Error getting search suggestions:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
