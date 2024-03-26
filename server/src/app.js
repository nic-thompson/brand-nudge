const path = require('path');
const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');

const productsRouter = require('./routes/products/products.router');

const app = express();

app.use(helmet());

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
