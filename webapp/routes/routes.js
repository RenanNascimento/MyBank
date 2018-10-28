const indexRouter  = require('./index.route')
const clientRoute = require('./client.route')
const authRouter = require('./auth.route');
const transactionsMenuRouter = require('./transactions-menu.route.js')

const configRoutes = (app, passport) => {
  app.use('/', indexRouter);
  app.use('/clients', clientRoute);
  app.use('/auth', authRouter);
  app.use('/menu-transacoes', transactionsMenuRouter);
}

module.exports = { configRoutes }