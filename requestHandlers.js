var fs = require('fs')

function getAllMovies(res, req) {
  console.log("Request handler 'getAllMovies' was called.")
  //读取电影data
  fs.readFile('./data/data.json', function(err, data) {
    if(err) {
      console.log('err')
    } else {
      res.json(data.toString())
      res.end()
    }
  })
}


function signup(res, req) {
  var info = req.body
  console.log('req.body', req.body)
  
  // res.cookie('username', info.username, {'maxAge':90000})
  // res.cookie('password', info.password, {'maxAge':90000})
  // console.log('req', req.body)

  saveData('./data/login.json', info)
  res.send(info)
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


exports.getAllMovies = getAllMovies
exports.signup = signup
