// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually start from.
process.chdir(__dirname);


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

//morgan logs some request stats
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//++get routes from controllers++
var fs = require('fs'),
    path = require('path');
 
var controllersDir = 'controller',
    files = fs.readdirSync(controllersDir);
 //make sure controller file module exports setup(app) function
files.forEach(function (file) {
    var filePath = path.resolve('./', controllersDir, file),
        controller = require(filePath);
    controller(app);
});

//--get routes from controllers--

//++server error handlers
// error handlers

// catch 404 and forward to error handler no route found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err.stack
    });
  });
}else{
  // production error handler
  // no stacktraces leaked to user
   app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });  
}



//--server error handlers

//++starting server
var PORT = normalizePort(process.env.PORT || '3000');
var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  console.log('starting in env: '+ app.get('env'));
  

});
//--starting server

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

