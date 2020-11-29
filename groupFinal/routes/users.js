var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET register page. */
router.get('/new', function(req, res, next) {
  res.render('register', { alert: '', info: {
    user_name: '',
    first_name: '',
    last_name: '',
    email: ''
  } });
});

/* GET register page. */
router.get('/profile', function(req, res, next) {
  res.render('edit', { alert: '', info: {
    user_name: '',
    first_name: '',
    last_name: '',
    email: ''
  } });
});

router.post('/new/add', user_controller.validation, user_controller.user_add);

module.exports = router;
