import Route from '@ioc:Adonis/Core/Route'
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const connection = 'mongodb://abhay:abhayabhay@cluster0.6itwk6b.mongodb.net/coins';

const coinSchema = new mongoose.Schema({
    id: String,
    symbol: String,
    name: String,
    platforms: {
      type: String
    }
});

const Coin = mongoose.model('Coin', coinSchema);


Route.get('/', async () => {
  try {
    const axiosCall = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const coins = axiosCall.data;
   // console.log(coins)    

    await mongoose.connect(connection, { useNewUrlParser: true});

    await Coin.insertMany(coins); 

    await mongoose.disconnect();
   
    return 'Data stored successfully!';

  } catch (error) {
    console.log(error.message)
    return 'Error :' + error.message;
  }  
});

module.exports = Route;

