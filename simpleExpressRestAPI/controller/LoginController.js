//login apis goes here
//put a setup funct to add corresponding request handlers and middleware for the login
var AuthHandler = require('../handler/UserAuthHandler');

var setup = function(app){
    
      app.use('/',AuthHandler.demoCheck);
    
      app.get('/', api);
    
    };
  
var api = function (req, res) {
       //throw new Error('throwed error'); 
      res.send('Hello World!');
      
    };


module.exports  = setup;