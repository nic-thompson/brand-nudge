const path = require('path');
const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

require('dotenv').config();

const app = express();

app.use(helmet());

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('Google profile', profile);
  return done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log('Current user is:', req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must be logged in to access this resource.',
    });
  }
  next();
}

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
  }),
  (req, res) => {
    res.send('You have successfully authenticated...');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

app.get('/failure', (req, res) => {
  res.send('Failed to authenticate...');
});

var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const productsRouter = require('./routes/products/products.router');

app.use('/products', productsRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
