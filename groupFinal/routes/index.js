var express = require('express');
var router = express.Router();

// Require our controllers.
var topping_controller = require('../controllers/toppingController');
var dailyChoice_controller = require('../controllers/dailyChoiceController');
let user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slice of Pacific' });
});

// GET dailyChoice page.
router.get('/dailyChoice/:id', dailyChoice_controller.topping_list);

//POST new dailyChoice
router.post('/dailyChoice/new/add', dailyChoice_controller.dailyChoice_new_add);

module.exports = router;
