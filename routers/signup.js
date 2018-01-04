var express = require("express")
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())


module.exports = function router(req, res) {
  var info = req.body
  res.cookie('username', info.username, {'maxAge':90000})
  res.cookie('password', info.password, {'maxAge':90000})
    console.log('req', req.body)

  saveData('data/login.json', info)
  res.send(req.body)
}


function saveData(path, info) {
    fs.appendFile(path, JSON.stringify(info), function(err) {
        if (err) {
            return console.log(err)
        } else{
          console.log('ok');
        }
    })
}
