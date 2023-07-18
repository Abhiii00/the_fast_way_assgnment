import Route from '@ioc:Adonis/Core/Route'
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const connection = 'mongodb://abhay:abhayabhay@cluster0.6itwk6b.mongodb.net/coins?retryWrites=true&w=majority';

const coinSchema = new mongoose.Schema({
    id: String,
    symbol: String,
    name: String,
});

const Coin = mongoose.model('Coin', coinSchema);


Route.get('/', async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const coins = response.data;
    console.log(coins)

    await mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });

    await Coin.insertMany(coins);

    await mongoose.disconnect();

    return 'Data stored successfully!';
  } catch (error) {
    console.log(error.message)
    return 'Error :' + error.message;
  }
});

module.exports = Route;

