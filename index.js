var express = require('express')
var app = express()

var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

var getMovies = require('./routers/getMovies.js')
var router = require('./router.js')


getMovies()
app.use(express.static('public'))


router.route(app)

app.listen(8888, () => console.log('Server has started'))