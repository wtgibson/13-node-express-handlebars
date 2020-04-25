// Import MySQL connection
var connection = require("../config/connection.js");

// Generate correct number of ? for SQL syntax
function printQuestionMarks(num) {
  var str = ""
  for (var i = 0; i < num; i++) {
    str += "?";
  }
  return str.split("").join(",")
};

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob,key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  all: function (table, cb) {
    var queryStr = "SELECT * FROM " + table + ";";
    connection.query(queryStr, function (err, result) {
      if (err) throw err;
      cb(result)
    });
  },
  create: function (table, cols, vals, cb) {
    var queryStr = "INSERT INTO " + table;
    queryStr += " (";
    queryStr += cols.toString();
    queryStr += " ) ";
    queryStr += "VALUES (";
    queryStr += printQuestionMarks(vals.length);
    queryStr += ") ";

    console.log(queryStr);

    connection.query(queryStr, function (err, result) {
      if (err) throw err;
      cb(result)
    });
  },
  update: function (table, objColVals, condition, cb) {
    var queryStr = "UPDATE " + table;
    queryStr += " SET " + objToSql(objColVals);
    queryStr += " WHERE ";
    queryStr += condition;

    console.log(queryStr);

    connection.query(queryStr, function (err, result) {
      if (err) throw err;
      cb(result)
    });
  },
  delete: function (table, condition, cb) {
    var queryStr = "DELETE FROM " + table;
    queryStr += " WHERE ";
    queryStr += condition;

    console.log(queryStr);

    connection.query(queryStr, function (err, result) {
      if (err) throw err;
      cb(result)
    });
  }

};

module.exports = orm;