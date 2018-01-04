var express = require('express')
var app = express()
var fs = require('fs')
var getMovies = require('./routers/getMovies.js')
var signup = require('./routers/signup.js')

app.listen(8888)

app.use(express.static('public'))
//获取正在上映电影信息
app.get('/getmovies', function(req, res) {
  getMovies()
  fs.readFile('data/data.json', function(err, data) {
    if(err) {
      console.log('err')
    } else {
      // console.log('data', data)
      res.json(data.toString())
    }
  })
})



//注册router
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.post("/signup", function(req, res) {
  signup(req, res)
})
