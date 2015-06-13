/*+++++Init postgres sql models+++++*/
var fs = require('fs');
var Sequelize = require('sequelize');
var config    = require('config').sqldb;

// initialize postgres database connection
var sequelize = new Sequelize(
  config.name,
  config.username,
  config.password,
  config.options
);

var sqlDir = __dirname+'/postgres';

var  sqlModels = fs.readdirSync(sqlDir);

module.exports.postgres = {};

sqlModels.forEach(function (file) {
    
    console.log('processing sql model '+file);
    var model = sequelize.import(sqlDir + '/' + file);
    module.exports.postgres[model.name] = model;
    console.log('processing sql model name '+model.name);
});

module.exports.postgres.syncDB = function(cb){
    sequelize.sync().then(cb);
}
/*-----init postgres sql models-----*/


