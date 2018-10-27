const path = require('path');
const express = require('express');

const indexRouter  = require('./index.route')
const clientsRoute = require('./clients.route')

const configRoutes = app => {
  app.use('/', indexRouter);
  app.use('/clients', clientsRoute);
}

module.exports = { configRoutes }