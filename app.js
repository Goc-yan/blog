let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

let { sha512, createCookie } = require('./utils')

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

let getCookie = (cookie) => {

  let res = {}

  if (cookie) {
    cookie.split(';').forEach(item => {
      item = item.trim()
      let [k, v] = item.split('=')
      res[k] = v
    })
  }

  return res
}

// 验证用户合法性
let verification = function (req, res, next) {


  let cookie = getCookie(req.headers.cookie)
  let currentTimestamp = new Date().getTime()
  let { name, timestamp, token } = cookie

  if (req.method !== 'GET' && req.path !== '/api/login') {

    if (sha512(`name=${name}&timestamp=${timestamp}`) !== token || (currentTimestamp - timestamp > 24 * 60 * 60 * 1000)) {
      res.send({
        errCode: 1001, // 鉴权失效
        errMsg: '令牌无效, 请重新登陆'
      })
      return
    }
  }

  if (req.path !== '/api/login' && req.headers.cookie) {

    if (timestamp && currentTimestamp - timestamp > 1 * 60 * 1000 && currentTimestamp - timestamp < 30 * 60 * 1000) {
      let cookieList = createCookie(name, currentTimestamp, token)
      console.log(cookieList)
      res.setHeader("Set-Cookie", cookieList);
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
