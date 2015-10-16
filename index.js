// Initial Varibales

var port = process.env.PORT || 6969;



//  Requirements
var http = require("http");
var fs = require('fs');
var dataBaseMethods = require('./dataBaseMethods');
var routing = require('./routing');




// init server
var server = http.createServer(routing);
// server listen on port
server.listen(port, function(){
	console.log('Listening on port ' + port);
});
