module.exports = function(app){
  var index = require('../controllers/index.controller.js');
  app.get('/' , index.render);
  app.get('/heraapp' , index.render);
  app.get('/heraapp/index' , index.render); 
};
