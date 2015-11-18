var mongoose = require("mongoose");

var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
        var mongoDatabase = 'mongodb://localhost/theCountedData';
        break;
    case 'prod':
        var mongoDatabase = 'mongodb://localhost/theCountedData'
        break;
}

mongoose.connect( mongoDatabase);
var db = mongoose.connection;
db.on('error', function (err) {
	console.log('connection error', err);
});
db.once('open', function () {
	console.log('connected.');
});


var Schema = mongoose.Schema;
var personSchema = new Schema({
      name: String,
      age: String,
      sex: String,
      race: String,
      month: String,
      day: String,
      year: String,
      address: String,
      city: String,
      state: String,
      cause: String,
      dept: String,
      armed: String,
});
a = [];
// Schema to DB Model
var Person = mongoose.model('Person', personSchema);

module.exports.findAll = function(res){
  Person.find().
  exec(function(err,data){
    if(err){
      res.status(500)
    };
    res.status(200).send(data)
  });
}
module.exports.findFilter = function(res, data){
  Person.find(data).
  exec(function(err,data){
    if(err){
      res.status(500)
    };
    res.status(200).send(data)
  });
}
