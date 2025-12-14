const mongoose = require('mongoose');
const { sampleFoodCategories, sampleFoodItems } = require('./data/sampleData');

// const mongoURI = 'mongodb+srv://bhavyasrivastava014:1InA2CAAy8PMfMVY@cluster0.hgzil.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';
require("dotenv").config()

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log("Connected to MongoDB");

        // Check if collections exist and have data
        const categoryCount = await mongoose.connection.db.collection("foodCategory").countDocuments();
        const foodItemCount = await mongoose.connection.db.collection("food_items").countDocuments();

        // If collections are empty, populate with sample data
        if (categoryCount === 0) {
            await mongoose.connection.db.collection("foodCategory").insertMany(sampleFoodCategories);
            console.log(`Initialized ${sampleFoodCategories.length} food categories`);
        }

        if (foodItemCount === 0) {
            await mongoose.connection.db.collection("food_items").insertMany(sampleFoodItems);
            console.log(`Initialized ${sampleFoodItems.length} food items`);
        }

        // Load data into global variables
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        
        global.food_items = fetched_data;
        global.foodCategory = foodCategory;
        
        console.log(`Connected to database and loaded ${fetched_data.length} food items, ${foodCategory.length} categories`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log("Using local sample data as fallback...");
        
        // Fallback: Use sample data directly
        global.food_items = sampleFoodItems;
        global.foodCategory = sampleFoodCategories;
        
        console.log(`Loaded ${sampleFoodItems.length} food items, ${sampleFoodCategories.length} categories from local data`);
    }
};

module.exports = mongoDB;
