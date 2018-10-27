const indexRouter  = require('./index.route')
const clientRoute = require('./client.route')

const configRoutes = app => {
  app.use('/', indexRouter);
  app.use('/clients', clientRoute);
}

module.exports = { configRoutes }