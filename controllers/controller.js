const express = require("express");

var router = express.Router();

// Import model to use db functions
var burger = require("../models/burger.js");

// Routes
router.get("/", function(req, res) {
  burger.all(function(data){
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured], function(result) {
    console.log(result);
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    console.log(result)
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);
  
//   burger.delete(condition, function(result) {
//     if (result.changedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server
module.exports = router