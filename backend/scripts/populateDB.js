const mongoose = require('mongoose');
const { sampleFoodCategories, sampleFoodItems } = require('../data/sampleData');
require('dotenv').config();

const populateDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await mongoose.connection.db.collection('foodCategory').deleteMany({});
        await mongoose.connection.db.collection('food_items').deleteMany({});
        console.log('Cleared existing data');

        // Insert food categories
        await mongoose.connection.db.collection('foodCategory').insertMany(sampleFoodCategories);
        console.log(`Inserted ${sampleFoodCategories.length} food categories`);

        // Insert food items
        await mongoose.connection.db.collection('food_items').insertMany(sampleFoodItems);
        console.log(`Inserted ${sampleFoodItems.length} food items`);

        console.log('Database population completed successfully!');
        
        // Verify the data
        const categoryCount = await mongoose.connection.db.collection('foodCategory').countDocuments();
        const foodItemCount = await mongoose.connection.db.collection('food_items').countDocuments();
        
        console.log(`\nVerification:`);
        console.log(`Categories in database: ${categoryCount}`);
        console.log(`Food items in database: ${foodItemCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
};

// Run the script
populateDatabase();
