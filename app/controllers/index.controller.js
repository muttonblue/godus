var PAGE = 'index';
exports.render = function(req, res){
  //  res.render('pages/index'); // ejs
  var isLoggedIn = false;
  console.log('c  c  ' + JSON.stringify(req.session)  );
  if(typeof req.session.remember !== 'undefined'){
    isLoggedIn = req.session.remember;
  }

   res.render(PAGE , {
     "title" : "Hello World",
     "message" : "How are things."
   }); //jade
};
