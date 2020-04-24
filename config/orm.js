// Import MySQL connection
var connection = require("../config/connection.js");

// Generate correct number of ? for SQL syntax
function numQuestionMarks (num) {
  var str = ""
  for (var i = 0; i < num; i++) {
    str += "?";
  }
  return str.split("").join(",")
};

var orm = {
  all: function (table, cb) {
    var queryStr = "SELECT * FROM " + table + ";";
    connection.query(queryStr, function (err, result) {
      if (err) throw err;
      cb(result)
    });
  },
  create: function (table, cb) {
    var queryStr = "SELECT * FROM " + table + ";";
    connection.query(queryStr, function (err, result) {
      if (err) throw err;
      cb(result)
    });
  },
};
