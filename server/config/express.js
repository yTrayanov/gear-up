const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const localSignupStrategy = require('../passport/local-signup')
const localLoginStrategy = require('../passport/local-login')
const authRoutes = require('../routes/auth')
const productRoutes = require('../routes/product')
const statsRoutes = require('../routes/stats')
const orderRoutes = require('../routes/order');
const express = require('express');

module.exports = app => {
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(cors());

  passport.use('local-signup', localSignupStrategy)
  passport.use('local-login', localLoginStrategy)

  // routes
  app.use('/auth', authRoutes);
  app.use('/product', productRoutes);
  app.use('/order' ,orderRoutes );
  app.use('/stats', statsRoutes);
}