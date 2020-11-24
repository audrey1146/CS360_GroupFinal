var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET register page. */
router.get('/new', function(req, res, next) {
  res.render('register', { title: 'Slice of Pacific' });
});

router.post('/new/add', user_controller.validation, user_controller.user_add);

module.exports = router;
