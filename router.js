var requestHandlers = require("./requestHandlers.js")

function route(app) {
  app.get('/getAllMovies', function (req, res) {
    console.log("Request for getAllMovies received.")
    requestHandlers.getAllMovies(res, req)
  })
  
  app.post('/signup', function (req, res) {
    console.log("Request for signup received.")
    requestHandlers.signup(res, req)
  })

}
exports.route = route;

