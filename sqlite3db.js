var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();

var file = "counted.db";
var db = new sqlite3.Database(file);
