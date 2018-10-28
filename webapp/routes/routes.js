const indexRouter  = require('./index.route')
const clientRoute = require('./client.route')
const transactionsMenuRouter = require('./transactions-menu.route.js')

const configRoutes = app => {
  app.use('/', indexRouter);
  app.use('/transactions-menu', transactionsMenuRouter);
  app.use('/clients', clientRoute);
}

module.exports = { configRoutes }