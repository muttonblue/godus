var express = require('express'); // ref. https://expressjs.com/
var path = require('path');
var app = express();

/*******************************************************
  app.set(name, value)
  - ตั้งค่า environment variable
  app.get(name)
  - รับค่า environment variable
  app.user([path], callback)
  - สร้าง middleware เพื่อ handle request กับ path ที่กำหนด
---------------------------------------------------------
  app.get(path, calback)
  - สร้าง middleware เพื่อ handle GET request กับ path ที่กำหนด
  app.post(path, calback)
  - สร้าง middleware เพื่อ handle POST request กับ path ที่กำหนด
  app.put(path, calback)
  - สร้าง middleware เพื่อ handle PUT request กับ path ที่กำหนด
  app.delete(path, calback)
  - สร้าง middleware เพื่อ handle DELETE request กับ path ที่กำหนด
  app.rout(path)
     .get(callback)
     .post(callback);
****************************************************** */

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file
/**
  req.query : query string http://localhost/page1/ket=1&key=2
  req.params : rounting http://localhost/page1/param1/param2
  req.body
  req.path, req.host, req.ip
*/
var helloWorld = function(req, res, next) {

};

//////////////////////////////////////////////////////////

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// component page
app.get('/component', function(req, res) {
    res.render('pages/component');
});

// component-aui page
app.get('/aui', function(req, res) {
    res.render('pages/component-aui');
});

// template
app.get('/template', function(req, res) {
    res.render('pages/template');
});

// patient page
app.get('/patient', function(req, res) {
    res.render('pages/patient');
});

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log(">>>>> Start Service listening at http://%s:%s", host, port)
})

module.exports= app;
