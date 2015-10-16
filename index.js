// Initial Varibales

var port = process.env.PORT || 6969;



//  Requirements
var http = require("http");
var express = require("express");
var fs = require('fs');
var url = require('url');
var request = require('request');
var csv = require('csv');
var dataBaseMethods = require('./dataBaseMethods');


var app = express();

// init server
var server = http.createServer(app);
// server listen on port
server.listen(port, function(){
	console.log('Listening on port ' + port);
});



// Make a router
var apirouter = express.Router();

// middleware to use for all requests
apirouter.use(function(req, res, next) {
    // do logging
    console.log('Route Call.');
  // make sure we go to the next routes and don't stop here
    next();
});


apirouter.route('/victim')
    .get(function(req, res, next){
    console.log("victim")
    var get_params = url.parse(req.url, true).query;
    if (Object.keys(get_params).length == 0){
      console.log("hay")
				dataBaseMethods.findAll(res)

    }else{
      var queryobj = {};
      keys = Object.keys(get_params);
      // console.log(keys)
      for(var i=0;i<keys.length;i++){
        queryobj[keys[i]] = get_params[keys[i]];
      }
			dataBaseMethods.findAll(res, queryobj)

    }
});


app.use('/', apirouter);
