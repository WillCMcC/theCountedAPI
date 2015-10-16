var request = require('request');
var csv = require('csv');
var mongoose = require("mongoose");



var mongoDatabase = 'mongodb://localhost/theCountedData';
mongoose.connect( mongoDatabase);
var db = mongoose.connection;
db.on('error', function (err) {
	console.log('connection error', err);
});
db.once('open', function () {
	console.log('connected.');

});

//Define Squid Schema
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

request.get('https://interactive.guim.co.uk/2015/the-counted/thecounted-data.zip', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("got it")
      var c = [];
      a = body.split("\n");

      for(var i = 2; i < a.length - 8; i++){
        b = a[i].split(",")

				// console.log(b[0])
        var g = new Person({
          name: b[0].replace(/"/g, ""),
          age: b[1].replace(/"/g, ""),
          sex: b[2].replace(/"/g, ""),
          race: b[3].replace(/"/g, ""),
          month: b[4].replace(/"/g, ""),
          day: b[5].replace(/"/g, ""),
          year: b[6].replace(/"/g, ""),
          address: b[7].replace(/"/g, ""),
          city: b[8].replace(/"/g, ""),
          state: b[9].replace(/"/g, ""),
          cause: b[10].replace(/"/g, ""),
          dept: b[11].replace(/"/g, ""),
          armed: b[12].replace(/"/g, ""),
        })
				g.save(function(err, data){
					if(err){console.log(err)}
					console.log(data)
				})

      }

    }
}, function(error, data){
    console.log(data)


});
