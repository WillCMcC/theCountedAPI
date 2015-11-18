var express = require("express");
var request = require('request');
var url = require('url');
var CacheControl = require("express-cache-control")
var path    = require("path");

// how we implement custom routes with the database
var dataBaseMethods = require('./dataBaseMethods');

var app = express();
app.use(express.static('public'));

// Make a router
var apirouter = express.Router();

var cache = new CacheControl().middleware

// middleware to use for all requests
apirouter.use(cache("hours", 3), function(req, res, next) {
    // do logging
    console.log('Route Call to ' + req.url);
  // make sure we go to the next routes and don't stop here
    next();
});


apirouter.route('/counted')
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

app.use('/api', apirouter);
module.exports = app;
