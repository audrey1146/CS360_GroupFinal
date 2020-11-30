/*****************************************************************************
 * File Name:     users.js
 * Date:          11/27/2020
 * Assignment:    Final Group Assignment
 * Purpose :      All of the user routes for the Slice of Pacific website
 ****************************************************************************/

let express = require('express');
let router = express.Router();

const {body,validationResult} = require("express-validator");

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
