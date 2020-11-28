var express = require('express');
var router = express.Router();

// Require our controllers.
var topping_controller = require('../controllers/toppingController'); 
var dailyChoice_controller = require('../controllers/dailyChoiceController'); 

/* GET home page. */
router.get('/', dailyChoice_controller.topping_list);

module.exports = router;
