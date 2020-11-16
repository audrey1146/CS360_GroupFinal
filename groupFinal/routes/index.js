var express = require('express');
var router = express.Router();

// Require our controllers.
var topping_controller = require('../controllers/toppingController'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slice of Pacific' });
});

module.exports = router;
