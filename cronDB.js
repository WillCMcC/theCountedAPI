var CronJob = require('cron').CronJob;

var request = require('request');
var csv = require('csv');
var mongoose = require("mongoose");
var peopleArr = [];
var saveCounter = 0;
var skipCounter = 0;




a = [];
// Schema to DB Model
var Person = mongoose.model('Person');


function getCSV(){
  console.log("getting")
  request.get('https://interactive.guim.co.uk/2015/the-counted/thecounted-data.zip', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("got it csv")
        var c = [];
        a = body.split('\n');
  			var bcomp = 0;
        for(var i = 2; i < a.length - 8; i++){
  				var indexer = [];
  				// console.log(a[i]);
  				while(a[i].length > 0){
  					var subber = a[i].substring(1,a[i].indexOf('"', 1))
  					if(subber.length != 1 || (subber.length ==1 && !isNaN(subber))) {indexer.push(subber)};
  					a[i] = a[i].substring(1, a[i].length)
  					a[i] = a[i].substring(a[i].indexOf('"'), a[i].length)
  				}
  				var b = indexer;
          if(b.length >12){
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
            peopleArr.push(g)
          }

  			}

        checkCSV();

        }

      }
  , function(error, data){
      console.log(data)


  });

}

//cron
new CronJob('0 0 */6 * * *', function() {
  console.log("running CSV check")
  peopleArr =[];
  getCSV();
}, null, true, 'America/Los_Angeles');





// start
peopleArr =[];
getCSV();


function checkCSV(){
  console.log("checking")
  peopleArr.forEach(function(g,i,a){
    var searchObj = {
      name: g.name,
      state: g.state,
      sex: g.sex,
      age: g.age,
      dept: g.dept,
      armed: g.armed,
    }
    Person.find(searchObj, function (err, person) {
      if (err) console.log(err);
      if(person.length == 0){
        console.log(g)
        g.save(function(err, data){
          if(err){console.log(err)}
          nd = new Date();
          dateString = nd.toUTCString();
          console.log(dateString + ": Added " + g.name)
        })
      }
    });

  })
}
