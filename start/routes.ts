/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/


import Route from '@ioc:Adonis/Core/Route'
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// const Route = use('Route');

// Route.get('/', () => {
//   return 
// })



// Define MongoDB connection string
const connection = 'mongodb://abhay:abhayabhay@cluster0.6itwk6b.mongodb.net/coins?retryWrites=true&w=majority';

// Define MongoDB schema
const coinSchema = new mongoose.Schema({
    id: String,
    symbol: String,
    name: String,
});

// Define MongoDB model
const Coin = mongoose.model('Coin', coinSchema);

// Route definition
Route.get('/', async () => {
  try {
    // Fetch data from the API
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const coins = response.data;
    console.log(coins)

    // Connect to MongoDB
    await mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });

    // Store data in MongoDB
    await Coin.insertMany(coins);

    // Disconnect from MongoDB
    await mongoose.disconnect();

    return 'Data fetched from API and stored in MongoDB successfully!';
  } catch (error) {
    console.log(error.message)
    return 'Error fetching and storing data: ' + error.message;
  }
});

module.exports = Route;

