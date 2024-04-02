const express = require('express');

const api = express.Router();

const productsRouter = require('./products/products.router');

api.use('/products', productsRouter);

module.exports = api;
