const app = require('./app');
const { connectMongo } = require('./services/mongo');

// Connect to MongoDB when the serverless function is called
connectMongo();

// Export the Express app for Vercel
module.exports = app;