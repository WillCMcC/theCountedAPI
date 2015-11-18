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
					id: b[0].replace(/"/g, ""),
          name: b[1].replace(/"/g, ""),
          age: b[2].replace(/"/g, ""),
          sex: b[3].replace(/"/g, ""),
          race: b[4].replace(/"/g, ""),
          month: b[5].replace(/"/g, ""),
          day: b[6].replace(/"/g, ""),
          year: b[7].replace(/"/g, ""),
          address: b[8].replace(/"/g, ""),
          city: b[9].replace(/"/g, ""),
          state: b[10].replace(/"/g, ""),
          cause: b[11].replace(/"/g, ""),
          dept: b[12].replace(/"/g, ""),
          armed: b[13].replace(/"/g, ""),
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
