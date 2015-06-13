var models = require('./index.js');
models.postgres.syncDB(function(){
    console.log("db sync complete");
    
    models.postgres.User.create({"username" : "test"}).then(function(){
        
        console.log("inser row");
        });
    });