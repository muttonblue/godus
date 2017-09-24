var express = require('express');
var morgan = require('morgan');// log requests to the console (express4)
var compression = require('compression');
var bodyParser = require('body-parser');// pull information from HTML POST (express4)
var path = require('path');
var sass = require('node-sass-middleware');
var cookieSession = require('cookie-session');
var expressSession = require('express-session');
var mongoose = require('mongoose');                     // mongoose for mongodb
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var conf = require('./conf'); // simulate DELETE and PUT (express4)

module.exports = function() {
 console.info('>>> START reder express.js >>>');
 console.log('conf : ' + JSON.stringify(conf) );


  var app = express(); // create our app w/ express
  //verify NODE_EVN
  let nodeEvn = process.env.NODE_EVN || 'development';
  if(nodeEvn === 'development') {
    app.use(morgan('dev'));
  }else {
    app.use(morgan('compression'));
  }

  app.use(expressSession({
    secret: 'sdfsdSDFD5sf4rt4egrt4drgsdFSD4e5',
    maxAge: Date.now() + (30 * 86400 * 1000),
    resave:false,
    saveUninitialized:true
  }));

  app.use(bodyParser.urlencoded({
    extended:true
  }));
  app.use(bodyParser.json()); 
  
  /* === set the view engine to ejs === **/
  //  app.set('view engine', 'ejs');
  app.set('view engine', 'jade');
  app.set('views', './app/views');
  // app.set('views', path.join(__dirname, '../app/views'));
 
 // Routes
  require('../app/routes/index.routes')(app);
   
  app.use(sass({
    src:'./sass',
    dest:'./public/css',
    outputStyle:'compressed',
    prefix:'/css',
    indentedSyntax: false, // sass:true, scss:false
    debug: true
  }));

  app.use(express.static('public'));
 
  console.info('<<< END reder express.js <<<');
  return app;
};
