const { MongoClient } = require('mongodb');
const uri =
  '';


const client = new MongoClient(uri);

const database = client.db('test');
const products = database.collection('products');
const orders = database.collection('orders')

module.exports = {
  products,
  orders
};