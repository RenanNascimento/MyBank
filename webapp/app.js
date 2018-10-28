const createError = require('http-errors')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
let cookieParser = require('cookie-parser');

const router = require('./routes/routes');

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

router.configRoutes(app, passport)

require('./passport')

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app