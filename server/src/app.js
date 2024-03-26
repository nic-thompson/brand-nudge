const path = require('path');
const express = require('express');
const morgan = require('morgan');
var rfs = require('rotating-file-stream');

const productsRouter = require('./routes/products/products.router');

const app = express();

var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/products', productsRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
