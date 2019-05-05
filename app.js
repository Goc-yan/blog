let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

let { sha512 } = require('./utils')

let indexRouter = require('./routes/index')
let mgrRouter = require('./routes/mgr')
let api = require('./api')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'dist', 'pages'))
app.engine('html', require('ejs').__express)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))


// CROS
let allowCrossDomain = function (req, res, next) {
  // res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", '3.2.1')
  // res.header("Content-Type", "application/jsoncharset=utf-8")

  if (req.method === 'OPTIONS') res.sendStatus(200)
  else next()
}

// 验证用户合法性
let verification = function (req, res, next) {

  if (req.method !== 'GET') {
    let cookie = req.headers.cookie
    let { name, timestamp, token } = cookie

    if (sha512(`name=${name}&timestamp=${timestamp}`) !== token) {
      console.log('token 不一致')
    }
  }
  next()
}

app.use(allowCrossDomain)
app.use(verification)
app.use('/api', api)
app.use('/', indexRouter)
app.use('/mgr', mgrRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
