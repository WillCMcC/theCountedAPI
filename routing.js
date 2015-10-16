var express = require("express");
var request = require('request');
var url = require('url');
var dataBaseMethods = require('./dataBaseMethods');

var app = express();

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
    var get_params = url.parse(req.url, true).query;
    if (Object.keys(get_params).length == 0){
				dataBaseMethods.findAll(res)

    }else{
      var queryobj = {};
      keys = Object.keys(get_params);
      // console.log(keys)
      for(var i=0;i<keys.length;i++){
        queryobj[keys[i]] = get_params[keys[i]];
      }
			dataBaseMethods.findFilter(res, queryobj)

    }
});
app.use('/', apirouter);
module.exports = app;
