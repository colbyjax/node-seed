/* Code adapted from the outstanding examples at scotch.io
 * https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
 */
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/rest-api');
var db = require('./models/db');
var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// START THE SERVER
// =======================================================================
app.listen(port);
console.log('Cyberdyne Systems Online.  Activating Skynet Self-Awareness protocols on port:' + port);

module.exports = app;
