process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();
var db = {};

// var server = app.listen(8081, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//    console.log(">>>>> Start Service listening at http://%s:%s", host, port)
// })
app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports=app;
